let should = require('chai').should(),
	loripsum = require('../loripsum');

describe('Slipsum', () => {
	it('get text from online service', (done) => {
		loripsum()
			.then((text) => {
				console.log(text);
				text.should.be.a('string');
				done()
			})
			.catch((e) => should.Throw(e));
	});
});