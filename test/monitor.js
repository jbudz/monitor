var monitor = require('../monitor');
var nock = require('nock');
nock.disableNetConnect();



describe('monitor', function() {
	beforeEach(function() {
		monitor.clear();
	});

	it('should throw an error if no domains have been added while starting', function() {
		monitor.start.should.throw();
	});

	it('should be able to add a single domain', function() {
		monitor.get().should.not.containEql('test1.test');
		monitor.add('test1.test');
		monitor.get().should.containEql('test1.test');
	});

	it('should be able to add multiple domains', function() {
		monitor.get().should.not.containEql('test2.test');
		monitor.get().should.not.containEql('test3.test');
		monitor.add(['test2.test', 'test3.test']);
		monitor.get().should.containEql('test2.test');
		monitor.get().should.containEql('test3.test');
	});

	it('should not allow duplicate domains to be added', function() {
		monitor.add('test2');
		monitor.add('test2');
		monitor.get().length.should.be.exactly(1);
		monitor.add(['test2', 'test2']);
		monitor.get().length.should.be.exactly(1);
	});

	it('should be able to remove a single domain', function() {
		monitor.add('test2.test');
		monitor.get().should.containEql('test2.test');
		monitor.remove('test2.test');
		monitor.get().should.not.containEql('test2.test');
	});

	it('should be able to remove multiple domains', function() {
		monitor.add(['test1', 'test2', 'test3']);
		monitor.remove(['test1', 'test3']);
		monitor.get().length.should.be.exactly(1);
		monitor.get().should.containEql('test2');
	});
});