var status = require('./lib/status');
var codes = require('./lib/codes');

var statusInterval;
var domains = [];

module.exports = {
	start: function(options, success, error) {
		if(domains.length === 0) {
			throw new Error("You need to add a domain before starting");
		}

		options = options || {
			interval: 5
		};

		options.interval = Math.ceil(options.interval)*60000

		statusInterval = setInterval(function() {
			domains.forEach(function(domain) {
				status.check(domain, function(res) {
					if(res.state === codes.UP && success) {
						success(res)
					} else if(error) {
						error(res);
					}
				});
			});
		}, options.interval);
	},
	stop: function() {
		clearInterval(statusInterval);
	},
	add: function(newDomain) {
		if(newDomain instanceof Array) {
			domains = domains.concat(newDomain)
		} else if(typeof newDomain === 'string') {
			domains.push(newDomain);
		}
	},
	remove: function(domain) {
		var index = domains.indexOf(domain);
		if(index >= 0) {
			domains.splice(index, 1);
		}
	}
}