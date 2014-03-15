var run = require('./run');
var generate = require('./generate').generateFile;

var gulp = {
  run: run,
  generate: generate,
};

module.exports = gulp;
