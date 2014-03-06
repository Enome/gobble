/*global describe, it, beforeEach*/

var fs = require('fs');
var specs = require('../../specs');
var generate = require('../generate');

describe('Gulp > Generate', function () {

  this.timeout(10000);

  beforeEach(function () {
    specs.cleanOutput();
  });

  describe('generateFile', function () {

    it('generates the Gulpfile', function () {

      generate.generateFile(specs.dir, specs.tasks);

      var result = fs.readFileSync(specs.dir + '/Gulpfile.js', 'utf-8');
      var expected = fs.readFileSync(__dirname + '/fixtures/expected.js', 'utf-8');

      result.should.eql(expected);

    });

  });

});

