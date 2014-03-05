/*global describe, it, beforeEach*/

var rimraf = require('rimraf');
var fs = require('fs');

var data = require('./test-data');
var generate = require('../generate-gulp-file');

describe('Generate Gulp File', function () {

  beforeEach(function () {
    rimraf.sync(data.dir);
    fs.mkdirSync(data.dir);
  });

  describe('generate', function () {

    describe('cammelCase', function () {

      it('converts dash to camel cased names', function () {

        generate
          .camelCased('gulp-concat')
          .should
          .eql('gulpConcat');
        
      });
      
    });

    describe('gulpfile', function () {

      it('generates the Gulpfile', function () {
        generate.gulpfile(data.dir, data.tasks);
        var result = fs.readFileSync(data.dir + '/Gulpfile.js', 'utf-8');
        var expected = fs.readFileSync(__dirname + '/expected/Gulpfile1.js', 'utf-8');
        result.should.eql(expected);
      });
      
    });
    
  });
  
});
