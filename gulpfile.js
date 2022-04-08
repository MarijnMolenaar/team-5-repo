const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');

gulp.task('test', function() {
  console.log('Gulp is geinstalleerd');
});

// JS minifier
gulp.task('useref', function(){
  return gulp.src('public/views/*.html')
    .pipe(useref())
    //zorgt ervoor dat alleen js bestanden worden geminified
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('public/js'))
    //zorgt ervoor dat alleen css bestanden worden geminified
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('public/css'))
});
