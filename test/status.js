var should = require('should');
var status = require('../lib/status');
var codes = require('../lib/codes');
var nock = require('nock');

nock.disableNetConnect();

describe('status', function() {
	it('should be able to return an invalid url status', function() {
		status.check('test..com', function(res) {
			res.should.have.property('state', codes.INVALID_URL);
		})
	})

	it('should be able to return an up status', function() {
		nock('http://test.test').head('/').reply(201);
		status.check('test.test', function(res) {
			res.should.have.property('state', codes.UP);
			res.should.have.property('code', 201);
			res.should.not.have.property('code', 200);
		});
	});

	it('should be able to return a down status', function() {
		nock('http://test.test').head('/').reply(500);
		status.check('test.test', function(res) {
			res.should.have.property('state', codes.DOWN);
			res.should.have.property('code', 500);
			res.should.not.have.property('code', 200);
		});
	});
});