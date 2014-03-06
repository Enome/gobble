var gulp = require('gulp');
var gulpConcat = require('gulp-concat');

gulp.task('concat', function () {
  return gulp
    .src(['1.txt', '2.txt'])
    .pipe(gulpConcat('combined.txt'))
    .pipe(gulp.dest('build/'));
});

module.exports = gulp;
