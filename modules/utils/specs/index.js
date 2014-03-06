/*global describe, it, beforeEach*/

var utils = require('../');
var specs = require('../../specs');

describe('Utils', function () {

  describe('cammelCase', function () {

    it('turns a dashed word into a cammel cased one', function () {
      
      utils
        .camelCase('gulp-concat')
        .should
        .eql('gulpConcat');

    });
    
  });

  describe('collectNpmModules', function () {

    it('filters the modules from tasks and adds the default gulp modules', function () {

      utils
        .collectModulesFromTasks(specs.tasks)
        .should.eql([ 'gulp', 'gulp-concat' ]);
      
    });
    
  });
  
});
