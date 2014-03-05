var data = {

  dir: __dirname + '/test_dir',

  tasks: [

    {
      name: 'streams',
      tasks: [],
      streams: [
        { module: 'gulp.src', code: "['1.txt', '2.txt']", }, 
        { module: 'gulp-wooza', code: "'combined.txt'", },
        { module: 'gulp.dest', code: "'build/'" }, 
      ]
    },

    {
      name: 'tasks',
      tasks: ['scripts'],
      streams: []
    },

    {
      name: 'both',
      tasks: ['scripts'],
      streams: [
        { module: 'gulp.src', code: "['1.txt', '2.txt']", }, 
        { module: 'gulp-concat', code: "'combined.txt'", },
        { module: 'gulp.dest', code: "'build/'" }, 
      ]
    }

  ] 

};

module.exports = data;
