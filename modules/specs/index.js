var rimraf = require('rimraf');
var fs = require('fs');

var specs = {

  dir: __dirname + '/output',

  cleanOutput: function () {
    rimraf.sync(specs.dir);
    fs.mkdirSync(specs.dir);
  },

  tasks: [
    {
      name: 'streams',
      tasks: [],
      streams: [
        { module: 'gulp.src', code: "['1.txt', '2.txt']", }, 
        { module: 'gulp-concat', code: "'combined.txt'", },
        { module: 'gulp.dest', code: "'build/'" }, 
      ]
    },

    {
      name: 'tasks',
      tasks: ['streams'],
      streams: []
    },

    {
      name: 'both',
      tasks: ['streams', 'tasks'],
      streams: [
        { module: 'gulp.src', code: "['1.txt', '2.txt']", }, 
        { module: 'gulp-concat', code: "'combined.txt'", },
        { module: 'gulp.dest', code: "'build/'" }, 
      ]
    }
  ],

};

module.exports = specs;
