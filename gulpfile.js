'use strict';

const
    gulp        = require('gulp'),
    sass        = require('gulp-sass')(require('sass')),
    cssmin      = require('gulp-clean-css'),
    rename      = require('gulp-rename'),
    prefix      = require('gulp-autoprefixer'),
    babel       = require('gulp-babel'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    sourcemaps  = require('gulp-sourcemaps'),
    plumber     = require('gulp-plumber'),
    jsImport    = require('gulp-js-import'),
    browserSync = require('browser-sync').create();

// Config CSS
function compileSass() {
    return gulp.src('assets/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(prefix('last 2 versions'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream());
}
exports.compileSass = compileSass;

//Config JS
function compileJs() {
    return gulp.src('assets/js/scripts.js')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(jsImport({hideConsole: true}))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./public/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/js'))
        .pipe(browserSync.stream());
}
exports.compileJs = compileJs;

//Config vendors JS
function compileVendors() {
    return gulp.src('assets/js/vendor/**/*.js')
        .pipe(plumber())
        .pipe(concat('plugins.js'))
        .pipe(gulp.dest('./public/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'))
        .pipe(browserSync.stream());
}
exports.compileVendors = compileVendors;

function watch() {
    gulp.watch('assets/scss/**/*.scss', compileSass);
    gulp.watch('assets/js/*.js', compileJs);
    gulp.watch('assets/js/vendor/**/*.js', compileVendors);
    gulp.watch('./*.html').on('change', browserSync.reload);
}
exports.watch = watch;

const build = gulp.series(compileSass, compileVendors, compileJs);

exports.default = build;
