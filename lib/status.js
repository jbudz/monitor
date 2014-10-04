var http = require('http');
var statusCodes = require('./codes');
var validator = require('validator');

//TODO: https
module.exports = {
	check: function checkStatus(host, cb) {
		if(!validator.isFQDN(host)) {
			cb({
				state: statusCodes.INVALID_URL,
				code: '-1'
			});
			return;
		}
		
		var request = http.request({
				method: 'HEAD',
				host: encodeURIComponent(host),
				port: 80,
				path: '/'
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