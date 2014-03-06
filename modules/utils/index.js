var _ = require('lodash');

var utils = {

  // Src: https://gist.github.com/pguillory/729616

  catchStream: function (stream, callback) {

    var old_write = stream.write;

    stream.write = function (string, encoding, fd) {
      old_write.apply(stream, arguments);
      callback(string, encoding, fd);
    };

    return function () {
      stream.write = old_write;
    };
  },
  

  // Src: http://stackoverflow.com/a/6661012/145117
  
  camelCase: function (string) {
    return string.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
  },


  collectModulesFromTasks: function (tasks) {
    
    var modules = tasks.map(function (task) {
      return task.streams;
    });

    modules = _.flatten(modules);

    modules = modules.map(function (module) {
      return module.module;
    });

    // Filter src and dest

    modules = modules.filter(function (module) {
      return module !== 'gulp.src' && module !== 'gulp.dest';
    });

    // Remove doubles

    modules = _.unique(modules);

    // Add default modules

    modules.unshift('gulp');

    return modules;

  },

};

module.exports = utils;
