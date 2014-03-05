var run_tasks = {

  run: function (name, callback) {

    process.chdir(__dirname + '/specs/test_dir');

    var gulp = require('./specs/test_dir/Gulpfile.js');

    gulp.on('--- start', function () {
      console.log('start', arguments); 
    });

    gulp.on('end', function () {
      console.log('--- end', arguments); 
      callback();
    });

    gulp.on('err', function () {
      console.log('--- err', arguments); 
    });

    gulp.on('task_start', function () {
      console.log('--- task_start', arguments); 
    });

    gulp.on('task_stop', function () {
      console.log('--- tast_stop', arguments); 
    });

    gulp.on('task_err', function () {
      console.log('--- task_err', arguments); 
    });

    gulp.on('task_not_found', function () {
      console.log('--- not_found', arguments); 
    });

    gulp.onAll(function () {
      console.log('--- all', arguments);
    });

    gulp.start([name], function () {
      console.log('cb', arguments); 
    });

  },

};

module.exports = run_tasks;
