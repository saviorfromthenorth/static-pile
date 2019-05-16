'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const log = require('gulplog');

function copyOpenSans() {
	return gulp.src('./node_modules/npm-font-open-sans/fonts/**/*')
		.pipe(gulp.dest('./dist/css/fonts/open-sans/'));
}

function copyFontAwesome() {
	return gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/**/*')
		.pipe(gulp.dest('./dist/css/fonts/webfonts/'));
}

function style() {
	return gulp.src('./src/scss/**/*.scss')
    .pipe(sass({
      includePaths: ['./node_modules']
    }).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
}

function script() {
	let b = browserify({
		entries: './src/js/app.js',
		debug: true
	});

	return b.bundle()
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({
			loadMaps: true
		}))
		.pipe(uglify())
		.on('error', log.error)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js/'));
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
	});
  gulp.watch('./src/scss/**/*.scss', style);
  gulp.watch('./dist/**/*.html').on('change', browserSync.reload);
  gulp.watch('./src/js/**/*.js', script).on('change', browserSync.reload);
}

exports.copy = gulp.series(copyOpenSans, copyFontAwesome);
exports.style = style;
exports.script = script;
exports.watch = watch;
exports.default = gulp.series(copyOpenSans, copyFontAwesome, watch);