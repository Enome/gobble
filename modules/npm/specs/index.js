/*global describe, it, beforeEach*/

var specs = require('../../specs');
var npm = require('../');

describe('npm', function () {

  this.timeout(10000);

  beforeEach(function () {
    specs.cleanOutput();
  });

  describe('install (npm will puke to stdout so just ignore that)', function () {

    it('logs GET and 304 status', function (done) {

      var modules = ['async', 'lodash'];
      var install = npm.install(specs.dir, modules);

      var result = [];

      var expected = [
        'npm http GET https://registry.npmjs.org/async',
        'npm http GET https://registry.npmjs.org/lodash',
        'npm http 304 https://registry.npmjs.org/lodash',
        'npm http 304 https://registry.npmjs.org/async'
      ];

      install.on('log', function (message) {
        result.push(message);
      });

      install.on('end', function () {

        result.should.matchEach(function (message) {
          return expected.indexOf(message) !== -1;
        });

        done();

      });
      
    });

    it('logs GET and a 404 error', function (done) {

      var modules = ['async', 'fooobaaarfooobaaar'];
      var install = npm.install(specs.dir, modules);

      var result = [];

      var expected = [
        'npm http GET https://registry.npmjs.org/fooobaaarfooobaaar',
        'npm http 404 https://registry.npmjs.org/fooobaaarfooobaaar',
      ];

      install.on('log', function (message) {
        result.push(message);
      });

      install.on('end', function () {

        result.should.matchEach(function (message) {
          return expected.indexOf(message) !== -1;
        });

        done();

      });
      
    });
      
  });

});
