var prettyHrtime = require('pretty-hrtime');
var EventEmitter = require('events').EventEmitter;

var run = function (dir, task) {

  var gulp_file = dir + '/Gulpfile.js';
  delete require.cache[gulp_file];

  var gulp = require(gulp_file);
  var ee = new EventEmitter();

  var stop = function () {
    ee.emit('end');
    ee.removeAllListeners();
  };

  gulp.on('stop', stop);

  gulp.on('task_start', function (event) {
    ee.emit('log', '[gulp] Running "' + event.task + '"');
  });

  gulp.on('task_stop', function (event) {
    ee.emit('log', '[gulp] Finished "' + event.task + '" in ' + prettyHrtime(event.hrDuration));
  });

  gulp.on('err', function (event) {
    ee.emit('err', '[gulp] ' + event.err.message);
    stop();
  });

  process.nextTick(function () {
    ee.emit('log', '[gulp] Using file ' + dir + '/Gulpfile.js');
    process.chdir(dir);
    gulp.start(task);
  });

  return ee;

};

module.exports = run;
