var fs = require('fs');
var utils = require('../utils');

var current = {

  requireStatements: function (tasks) {

    var modules = utils.collectModulesFromTasks(tasks);

    var statements = modules.map(function (module) {
      return 'var ' + utils.camelCase(module) + ' = require(\'' + module + '\');';
    });

    return statements.join('\n') + '\n\n';

  }, 

  tasks: function (tasks) {

    var output = [];

    tasks.forEach(function (task) {

      var s = "gulp.task('" + task.name + "'";

      // Tasks

      if (task.tasks.length) {
        s += ", [";

        task.tasks.forEach(function (t, i) {
          s += "'" + t + "'";

          if (i !== task.tasks.length - 1) {
            s += ", ";
          }

        });

        s += "]";
      }

      // Streams

      if (task.streams.length) {
        s += ", function () {\n" +
             "  return gulp\n";

        task.streams.forEach(function (stream, i) {

          switch (stream.module) {

          case 'gulp.src':
            s += "    .src(" + stream.code + ")";
            break;

          default:
            s += "    .pipe(" + utils.camelCase(stream.module) + "(" + stream.code + "))";

          }

          if (i === task.streams.length - 1) {
            s += ";\n";
          } else {
            s += "\n";
          }

        });

        s += "}";
            
      }

      s += ");\n";

      output.push(s);
      
    });

    return output.join('\n') + '\nmodule.exports = gulp;\n';
    
  },

  generateFile: function (dir, tasks) {
    fs.writeFileSync(dir + '/Gulpfile.js', current.requireStatements(tasks) + current.tasks(tasks));
  },

};

module.exports = current;
