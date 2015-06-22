"use sctrict";

var gulp = require('gulp'),
	concatCss = require('gulp-concat-css'),
	rename = require('gulp-rename'),
	notify = require('gulp-notify'),
	autoprefixer = require('gulp-autoprefixer'),
  less = require('gulp-less'),
  path = require('path'),
	  livereload = require('gulp-livereload'),
	  connect = require('gulp-connect'),
	minifyCss = require('gulp-minify-css'),
  opn = require("opn");


//gulp less
gulp.task('less', function () {
  gulp.src('app/less/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('app/css/'));
});

//server connect
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true,
    port: 8888
  });
  opn('http://localhost:8888');
});

 
//css
  gulp.task('css', function () {
  gulp.src('app/css/*.css')
    .pipe(concatCss("concat.css"))
    .pipe(minifyCss(""))
    .pipe(autoprefixer('last 15 versions'))    
    .pipe(rename("concat.min.css"))
    .pipe(gulp.dest('app/css'))
    .pipe(connect.reload())
    .pipe(notify('Done!'));
});


//html task
gulp.task('html', function() {
	gulp.src('app/index.html')
	 .pipe(connect.reload())
})

//watch
 gulp.task('watch', function () {
 	gulp.watch('app/css/*.css', ['css'])
  gulp.watch('app/*.html', ['html'])
  gulp.watch('app/less/*.less', ['less']) 
 })


//default
 gulp.task('default', ['connect', 'html','css','watch']);
