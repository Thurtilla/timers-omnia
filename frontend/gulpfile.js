'use strict';
 
// dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var changed = require('gulp-changed');
 
///////////////
// - SCSS/CSS
///////////////
 
var SCSS_SRC = './src/assets/scss/**/*.scss'
var SCSS_DEST = './src/assets/css';
//compiling
//OLD
// function compile_scss() {
//     return gulp.src(SCSS_SRC)
//         .pipe(sass().on('error', sass.logError))
//         .pipe(minifyCSS())
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(changed(SCSS_DEST))
//         .pipe(gulp.dest(SCSS_DEST));
// }
//NEW
gulp.task('compile_scss', function(){
    return gulp.src(SCSS_SRC)
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(changed(SCSS_DEST))
        .pipe(gulp.dest(SCSS_DEST));
});

// detect changes in SCSS
//OLD 
// function watch_scss() {
//     gulp.watch(SCSS_SRC, compile_scss);
// }
//NEW
gulp.task('watch_scss', function(){
    gulp.watch(SCSS_SRC, gulp.series('compile_scss'));
});
 
 
// Run tasks
gulp.task('default', gulp.series('watch_scss'));


//No need to export?
// exports.compile_scss = compile_scss;
// exports.watch_scss = watch_scss;