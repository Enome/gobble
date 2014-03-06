/*global describe, it, beforeEach*/

var fs = require('fs');
var specs = require('../../specs');
var run = require('../run');
var wrench = require('wrench');

describe('gulp', function () {

  this.timeout(10000);

  beforeEach(function () {

    specs.cleanOutput();

    wrench.mkdirSyncRecursive(specs.dir + '/node_modules/');
    wrench.copyDirSyncRecursive(__dirname + '/../../../node_modules/gulp', specs.dir + '/node_modules/gulp');
    wrench.copyDirSyncRecursive(__dirname + '/../../../node_modules/gulp-concat', specs.dir + '/node_modules/gulp-concat');

    fs.writeFileSync(specs.dir + '/1.txt', fs.readFileSync(__dirname + '/fixtures/1.txt'));
    fs.writeFileSync(specs.dir + '/2.txt', fs.readFileSync(__dirname + '/fixtures/2.txt'));
    fs.writeFileSync(specs.dir + '/Gulpfile.js', fs.readFileSync(__dirname + '/fixtures/Gulpfile.js'));

  });

  it('concats 1.txt and 2.txt', function (done) {

    var r = run(specs.dir, 'concat');

    r.on('end', function () {
      var result = fs.readFileSync(specs.dir + '/build/combined.txt', 'utf-8');
      result.should.eql('foo\n\nbar\n');
      done();
    });
    
  });

  it('logs what its doing without an error', function (done) {
    
    var log = [];
    var r = run(specs.dir, 'concat');

    r.on('log', function (message) {
      log.push(message);
    });

    r.on('end', function () {
      log[0].should.eql('[gulp] Using file /home/fs/Dropbox/work/g/gobble/modules/specs/output/Gulpfile.js');
      log[1].should.eql('[gulp] Running "concat"');
      log[2].should.startWith('[gulp] Finished "concat" in');
      done();
    });

  });

  it('logs what its doing with an error', function (done) {
    
    var errors = [];
    var r = run(specs.dir, 'faketask');

    r.on('err', function ooga(message) {
      errors.push(message);
    });

    r.on('end', function () {
      errors.should.eql(["[gulp] task \"faketask\" is not defined"]);
      done();
    });

  });

});
