let should = require('chai').should(),
	loripsum = require('../loripsum');

describe('Slipsum', () => {
		it('get plain text from online service', (done) => {
		loripsum.plain()
			.then((text) => {
				text.should.be.a('string');
				done();
			})
			.catch((e) => should.Throw(e));
	});

	it('get plain text from online service', (done) => {
		loripsum.html()
			.then((text) => {
				console.log(text);
				text.should.be.a('string');
				done();
			})
			.catch((e) => should.Throw(e));
	});
});