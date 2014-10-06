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
	add: function(domain) {
		if(domain instanceof Array) {
			var uniqueDomains = domain.filter(function(item) {
				return domains.indexOf(item) === -1;
			});
			domains = domains.concat(uniqueDomains);
		} else if(typeof domain === 'string' && domains.indexOf(domain) === -1) {
			domains.push(domain);
		}
	},
	remove: function(domain) {
		if(domain instanceof Array) {
			domains = domains.filter(function(item) {
				return domain.indexOf(item) === -1;
			});
		} else if(typeof domain === 'string') {
			var index = domains.indexOf(domain);
			if(index >= 0) {
				domains.splice(index, 1);
			}
		}
	},
	clear: function() {
		domains = [];
	},
	get: function() {
		return domains.slice(0);
	},
	set: function(newDomains) {
		domains = newDomains;
	}
}