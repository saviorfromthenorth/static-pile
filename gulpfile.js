'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

function style() {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass({
      includePaths: ['./node_modules']
    }).on('error', sass.logError))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './public'
    }
  });
  gulp.watch('./src/scss/**/*.scss', style);
  gulp.watch('./public/**/*.html').on('change', browserSync.reload);
  gulp.watch('./src/js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;