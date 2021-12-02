module.exports = testeval = (code) => {
	let logs = [];
	let errors = [];
	let evaluatedCode = '';
	try {
		console.log = function (d) {
			logs.push(d);
		};
		evaluatedCode = eval(code);
	} catch (err) {
		errors = JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err))).message;
	}
	return {
		logs,
		errors,
		evaluatedCode,
	};
};
