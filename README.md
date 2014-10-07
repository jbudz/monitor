# Monitor [![Build Status](https://travis-ci.org/jbudz/monitor.svg?branch=master)](https://travis-ci.org/jbudz/monitor)
Poke services to make sure they are still working

# Usage
```
var monitor = require('monitor');
monitor.add('github.com').start({
  interval: 1
}, up, down);

function up(url, response) {
  //url is working
}

function down(url, response) {
  //url is down
}
```
