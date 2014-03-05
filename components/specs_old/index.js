/*global describe, it, beforeEach*/

var data = require('./test-data');
var index = require('../index');

describe('installation', function () {

  this.timeout(150000);

  it('does all the things', function (done) {

    var i = index(data.dir, data.tasks);

    var log = '';

    i.on('log', function (message) {

      log += message;

      if (log.indexOf('\n') !== -1) {
        console.log('---');
        console.dir((log));
        log = '';
      }

    });

    i.on('error', function (message) {
      console.log('error', message);
    });

    i.on('end', function () {
      done();
    });
    
  });

});
