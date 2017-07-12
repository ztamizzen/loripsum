const http = require('http');

module.exports = function () {
	return new Promise((resolve, reject) => {
		http.get('http://loripsum.net/api/10/short/headers', (res) => {
			const { statusCode, headers } = res;
			console.log(statusCode, headers['content-type']);
			if (statusCode !== 200) {
				res.resume();
				reject(statusCode);
				return;
			}
			res.setEncoding('utf8');
			let rawData = '';
			res.on('data', (chunk) => {
				rawData += chunk;
			});
			res.on('end', () => {
				resolve(rawData);
			});
		}).on('error', (e) => reject(e));
	});
};