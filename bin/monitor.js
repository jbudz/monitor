#!/usr/bin/env node

var monitor = require('../monitor');

var args = process.argv.slice(2);

console.log('Monitoring ' + args.length + ' url(s)');

var liveUrls = {};

monitor.add(args);
monitor.start({
	interval: 1
}, function(domain) {
	if(typeof liveUrls[domain] === 'undefined') {
		console.log(domain + ' is up');
	} else if(!liveUrls[domain]) {
		console.log(domain + 'is back up');
	}
	liveUrls[domain] = true;
}, function(domain) {
	if(liveUrls[domain] || typeof liveUrls[domani] === 'undefined') {
		console.log(domain + ' is down');
	}
	liveUrls[domain] = false;
});