/*global describe, it, beforeEach*/

var rimraf = require('rimraf');
var fs = require('fs');

var data = require('./test-data');
var installation = require('../installation');

describe('installation', function () {

  beforeEach(function () {
    rimraf.sync(data.dir);
    fs.mkdirSync(data.dir);
  });

  // Todo: Verify which modules are install

  describe('collectNpmModules', function () {

    it('filters the modules from tasks and adds the default gulp modules', function () {

      installation
        .collectNpmModules(data.tasks)
        .should.eql([ 'gulp', 'gulp-concat' ]);
      
    });
    
  });

  describe('install', function () {

    this.timeout(150000);

    it('installs gulp and gulp-concat', function (done) {

      installation.install(data.dir, data.tasks, function () {

        fs.readdir(data.dir + '/node_modules', function (error, files) {
          files.should.eql(['.bin', 'gulp', 'gulp-concat']);
          done(); 
        });

      });

    });
    
  });
  
});
