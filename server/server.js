const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { performance } = require('perf_hooks');
const rateLimiter = require('express-rate-limit');
const cors = require('cors');
const worker = require('./worker.js');

const rateLimit = rateLimiter({
	windowMs: 10000, // 1 hour window
	max: 5, // start blocking after 5 requests
	message: 'Too many accounts created from this IP, please try again after an hour',
});

const app = express();

app.set('trust proxy', 1); // use this line if you’re using a proxy (Heroku, DigitalOcean, etc.); so req IPs are the client’s IP, not the IP of the proxy service
app.use(express.json());
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

app.post('/exec', rateLimit, async (req, res) => {
	var t0 = performance.now();
	const evaluatedCode = await worker(req.body.code);
	console.log(evaluatedCode);
	var t1 = performance.now();
	console.log(t1 - t0);
	if (evaluatedCode.error) {
		io.to(req.body.roomId).emit('output-payload', {
			type: 'error',
			output: evaluatedCode.output,
		});
	} else {
		io.to(req.body.roomId).emit('output-payload', {
			type: 'eval',
			output: { performance: t1 - t0, ...evaluatedCode.output },
		});
	}
	res.status(200).send('ok');
});

io.on('connection', async (socket) => {
	socket.join(socket.handshake.query.roomId);

	const getBrosInSession = async () => {
		return await io.in(socket.handshake.query.roomId).allSockets();
	};

	io.to(socket.handshake.query.roomId).emit('in-session', {
		message: [...(await getBrosInSession())],
	});

	socket.on('chat-message', (payload) => {
		io.to(payload.roomId).emit('session-chat-message', {
			message: payload.message,
			socketId: payload.socketId,
		});
	});

	socket.on('cursor-position', (payload) => {
		console.log(payload);
		socket.to(payload.roomId).emit('user-cursor-position', {
			message: { x: payload.message.x, y: payload.message.y, socketId: payload.socketId },
		});
	});

	socket.on('stop-cursor-position', (payload) => {
		io.to(payload.roomId).emit('user-stop-cursor-position', payload);
	});

	socket.on('code-payload', (payload) => {
		io.in(payload.id).emit('coder-typing', {
			message: payload.coder,
		});

		socket.to(payload.id).emit('code-payloadr', { code: payload.code, coder: payload.coder });
	});

	socket.on('output-payload', (payload) => {
		socket.to(payload.id).emit('output-payload', { output: payload.output });
	});

	socket.on('disconnect', async () => {
		socket.to(socket.handshake.query.roomId).emit('in-session', {
			message: [...(await getBrosInSession())],
		});
	});
});
httpServer.listen(process.env.PORT || 5000);

console.log('server started');
