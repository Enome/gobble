var npm = require('npm');
var EventEmitter = require('events').EventEmitter;

var utils = require('../utils');

var current = {

  install: function (dir, modules) {

    var ee = new EventEmitter();

    var log = '';

    var stderrCatcher = utils.catchStream(process.stderr, function (message) {

      log += message;

      if (log.indexOf('\n') !== -1) {
        ee.emit('log', log.slice(0, -1));
        log = '';
      }

    });

    process.nextTick(function () {

      npm.load({ color: false }, function (error) {

        npm.commands.install(dir, modules, function (error, data) {
          stderrCatcher();
          ee.emit('end');
        });

      });

    });

    return ee;
    
  },

};

module.exports = current;
