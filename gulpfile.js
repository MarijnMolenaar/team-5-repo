const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('cssnano');
const minifyCss = require('gulp-clean-css');
const concat = require('gulp-concat');

gulp.task('test', function () {
    console.log('Gulp is geinstalleerd');
});

// JS minifier

//command voor minifien: gulp useref
const {
    src,
    dest,
    watch
} = require('gulp');
const minifyJs = require('gulp-uglify');
const sourceMaps = require('gulp-sourcemaps');

const bundleJs = () => {
    return src('public/js/*.js')
        .pipe(sourceMaps.init())
        .pipe(minifyJs())
        .pipe(concat('bundle.js'))
        .pipe(sourceMaps.write())
        .pipe(dest('public/js/'))
}

const devWatch = () => {
    watch('public/js/', bundleJs)
}

exports.bundleJs = bundleJs;
exports.devWatch = devWatch;

// CSS minifier

const bundleCSS = () => {
    return src('./public/css/*.css')
        .pipe(minifyCss())
        .pipe(concat('bundle.css'))
        .pipe(dest('./public/css'));
}

const watchCSS = () => {
    watch('./public/css/*.css', bundleCSS);
};

exports.bundleCSS = bundleCSS;
exports.watchCSS = watchCSS;




gulp.task('useref', function () {
    return gulp.src('public/views/*.html')
        .pipe(useref())

        //zorgt ervoor dat alleen js bestanden worden geminified
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulp.dest('public/js'))

        //zorgt ervoor dat alleen css bestanden worden geminified
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('public/css'))


});