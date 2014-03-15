var gulp = require('gulp');
var browserify = require('gulp-browserify');
var clean = require('gulp-clean');
var rename = require('gulp-rename');

gulp.task('clean', function () {
  return gulp
    .src('build/')
    .pipe(clean());
});

gulp.task('browserify', ['clean'], function () {
  return gulp
    .src('ui/index.js')
    .pipe(browserify({ 
      transform: [ 'reactify' ],
      insertGlobals: false,
      detectGlobals: false
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('copy', ['clean'], function () {
  return gulp
    .src(['ui/index.html']) 
    .pipe(gulp.dest('build'));
});

gulp.task('copy:modules', ['clean'], function () {
  return gulp
    .src(['modules/**/*']) 
    .pipe(gulp.dest('build/node_modules/modules'));
});


gulp.task('nw-package.json', ['clean'], function () {
  return gulp
    .src('nw-package.json') 
    .pipe(rename('package.json'))
    .pipe(gulp.dest('build'));
});

gulp.task('watch', function () {
  return gulp.watch('ui/**/*', ['default']);
});

gulp.task('default', ['clean', 'browserify', 'copy', 'copy:modules', 'nw-package.json']);
