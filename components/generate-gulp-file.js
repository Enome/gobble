var fs = require('fs');
var swig = require('swig');
var installation = require('./installation');

var generate = {
  
  // Src: http://stackoverflow.com/a/6661012/145117
  
  camelCased: function (string) {
    return string.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
  },

  renderPlugin: function (stream) {

    if (stream.type === 'src') {
      return ".src(" + stream.code + ")";
    }

    if (stream.type === 'dest') {
      return ".pipe(gulp.dest(" + stream.code + "))";
    }

    return ".pipe(" + generate.camelCased(stream.type) + "(" + stream.code + "))";
    
  },

  render: function (tasks) {

    var template = swig.compileFile(__dirname + '/Gulpfile.swig');

    var modules = installation.collectNpmModules(tasks);

    return template({
      camelCased: generate.camelCased,
      modules: modules, 
      tasks: tasks,
      renderPlugin: generate.renderPlugin,
    });

  },

  gulpfile: function (dir, tasks) {
    var content = generate.render(tasks);
    fs.writeFileSync(dir + '/Gulpfile.js', content);
  },

};


module.exports = generate;
