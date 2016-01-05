'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var stylus = require('gulp-stylus');
var autoprefixer = require('autoprefixer-stylus');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');

// Error handler for gulp-plumber
var errorHandler = function (err) {
	gutil.log([(err.name + ' in ' + err.plugin).bold.red, '', err.message, ''].join('\n'));

	if (gutil.env.beep) {
		gutil.beep();
	}

	this.emit('end');
};

gulp.task('scripts', function (cb) {
	return gulp.src(['*.js', '!*.min.js', '!gulpfile.js'], {cwd: './'})
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./'));
});

gulp.task('styles', function (cb) {
	return gulp.src(['*.styl'], {cwd: './'})
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(stylus({
			use: [
				autoprefixer({
					browsers: ['last 2 version', '> 1%', 'safari 5', 'ie 8', 'ie 7', 'opera 12.1', 'ios 6', 'android 4'],
					cascade: false
				})
			]
		}))
		.pipe(gulp.dest('./'));
});

gulp.task("build", ['scripts', 'styles']);

gulp.task('dev', ['build'], function (cb) {
	gulp.watch(['./*.js', '!./*.min.js', '!./gulpfile.js'], ["scripts"]);
	gulp.watch('./*.styl', ["styles"]);
});
