var gulp = require('gulp');
var gulpConcat = require('gulp-concat');

gulp.task('streams', function () {
  gulp
    .src(['1.txt', '2.txt'])
    .pipe(gulpConcat('combined.txt'))
    .pipe(gulp.dest('build/'));
});

gulp.task('tasks', ['scripts']);

gulp.task('both', ['scripts'], function () {
  gulp
    .src(['1.txt', '2.txt'])
    .pipe(gulpConcat('combined.txt'))
    .pipe(gulp.dest('build/'));
});
