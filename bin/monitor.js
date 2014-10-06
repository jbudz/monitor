#!/usr/bin/env node

var monitor = require('../monitor');

var args = process.argv.slice(2);

monitor.add(args);
console.log('Monitoring ' + args.length + ' url(s)');
monitor.start({
	interval: 1
}, function(domain) {
	console.log(domain + ' is working');
}, function(domain) {
	console.log(domain + ' is down');
});