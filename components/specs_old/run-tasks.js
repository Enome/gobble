/*global describe, it, beforeEach*/

var fs = require('fs');
var rimraf = require('rimraf');

var run_tasks = require('../run-tasks');
var data = require('./test-data');

describe('Run tasks', function () {

  beforeEach(function () {
    rimraf.sync(data.dir + '/build');
    //rimraf.sync(data.dir);
    //fs.mkdirSync(data.dir);
    //fs.writeFileSync(data.dir + '/Gulpfile.js', fs.readFileSync(__dirname + '/expected/Gulpfile1.js'));
  });

  this.timeout(150000);

  it('runs the tasks', function (done) {
    run_tasks.run('streams', function (error) {
      done(error);
    });
  });

});

module.exports = run_tasks;
