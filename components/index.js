var EventEmitter = require('events').EventEmitter;
var installation = require('./installation');

var index = function (dir, tasks) {
  
  // Install modules
  // Generate Gulpfile
  // Run gulp

  var ee = new EventEmitter();

  var install = installation.install(dir, tasks);

  install.on('log', ee.emit.bind(ee, 'log'));
  install.on('error', ee.emit.bind(ee, 'error'));
  install.on('end', ee.emit.bind(ee, 'end'));

  return ee;

};

module.exports = index;
