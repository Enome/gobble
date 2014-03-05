var npm = require('npm');
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var utils = require('./utils');

var installation = {
  
  collectNpmModules: function (tasks) {

    var modules = tasks.map(function (task) {
      return task.streams;
    });

    modules = _.flatten(modules);

    modules = modules.map(function (module) {
      return module.module;
    });

    // Filter src and dest

    modules = modules.filter(function (module) {
      return module !== 'gulp.src' && module !== 'gulp.dest';
    });

    // Remove doubles

    modules = _.unique(modules);

    // Add default modules

    modules.unshift('gulp');

    return modules;

  },

  install: function (dir, tasks) {

    var ee = new EventEmitter();

    var modules = installation.collectNpmModules(tasks);

    var stderrCatcher = utils.catchStream(process.stderr, function (str) {
      ee.emit('log', str);
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

module.exports = installation;
