const { StaticPool } = require('node-worker-threads-pool');

module.exports = worker = async (code) => {
	const staticPool = new StaticPool({
		size: 4,
		task: (codeTask) => {
			let logs = [];
			let errors = '';
			let evaluatedCode = '';
			try {
				console.log = function (d) {
					logs.push(d);
				};
				const evaluate = (codeTask) => {
					return new Function(codeTask)();
				};
				evaluate(codeTask);
			} catch (err) {
				errors = JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err))).message;
			}
			return {
				logs,
				errors,
				evaluatedCode,
			};
		},
	});

	try {
		const res = await staticPool.createExecutor().setTimeout(2000).exec(code);
		return {
			output: res,
			error: null,
		};
	} catch (err) {
		return {
			output: {
				logs: [],
				errors: JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err))).message,
				evaluatedCode: '',
			},
			error: 'error',
		};
	}
};
