var http = require('http');
var https = require('https');
var statusCodes = require('./codes');
var validator = require('validator');
var parse = require('url').parse;

module.exports = {
	check: function checkStatus(url, cb) {
		var protocol;
		if(validator.isURL(url, {
			protocols: ['https'],
			require_protocol: true
		})) {
			protocol = https;
		} else if(validator.isURL(url)) {
			protocol = http;
			if(url.indexOf('http://') === -1) {
				url = 'http://' + url;
			}
		} else {
			cb({
				state: statusCodes.INVALID_URL,
				code: '-1'
			});
			return;
		}		

		url = parse(url);
		var request = protocol.request({
				method: 'HEAD',
				host: url.host,
				path: url.path
			},
			function(res) {
				var status = {
					code: res.statusCode
				};

				var baseStatus = (status.code + '')[0];
				if (baseStatus === '2' ||
					baseStatus === '3') {
					status.state = statusCodes.UP;
				} else {
					status.state = statusCodes.DOWN;
				}
				cb(status);
			});

		request.on('error', function(e) {
			cb({
				state: statusCodes.DOWN,
				code: e.message
			});
		});
		request.end();
	}
};