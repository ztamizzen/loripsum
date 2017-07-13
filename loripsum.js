const http = require('http');

const defaultOptions = {
	paragraphCount: 10,
	paragraphLength: "short",
	decorate: false,
	link: false,
	ul: false,
	ol: false,
	dl: false,
	bq: false,
	code: false,
	headers: true,
	allcaps: false,
	prude: false
};

module.exports = {
	html: function (__options = {}) {
		const options = Object.assign(
			{},
			defaultOptions, {
				plaintext: false
			}, __options);
		return getPromise(options);
	},
	plain: function (__options = {}) {
		const options = Object.assign(
			{},
			defaultOptions, {
				plaintext: true
			}, __options);
		return getPromise(options);
	}
};

function getPromise(options) {
	return new Promise((resolve, reject) => {
		let url = [];
		options.paragraphCount && url.push(options.paragraphCount);
		options.paragraphLength && url.push(options.paragraphLength);
		options.decorate && url.push('decorate');
		options.link && url.push('link');
		options.ul && url.push('ul');
		options.ol && url.push('ol');
		options.dl && url.push('dl');
		options.bq && url.push('bq');
		options.code && url.push('code');
		options.headers && url.push('headers');
		options.allcaps && url.push('allcaps');
		options.prude && url.push('prude');
		options.plaintext && url.push('plaintext');
		url = url.join('/');
		console.log(url);

		http.get(`http://loripsum.net/api/${url}`, (res) => {
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
}
