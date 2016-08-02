var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var minify = require('gulp-minify');
var connect = require('gulp-connect');
var uncss = require('gulp-uncss');
var jade = require('gulp-jade');
var src = 'app';
var dst = 'dist';

gulp.task('styles', function() {
    gulp.src(src+'/sass/style.sass')
        .pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
		/*.pipe(uncss({
            html: [dst+'/index.html'],
			ignore: [/js-/]
        }))*/
		.pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(dst+'/css/'));
});

gulp.task('styleCss', function() {
    gulp.src(src+'/css/**/*.css')
		/*.pipe(uncss({
            html: [dst+'/index.html']
        }))*/
		.pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(dst+'/css/'));
});

gulp.task('compressJS', function() {
  gulp.src(src+'/js/**/*.js')
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest(dst+'/js'));
});

gulp.task('reloadHTML', function() {
  return gulp.src(dst+'/**/*.html')
	.pipe(connect.reload());
});

gulp.task('templates', function() {
  var YOUR_LOCALS = {};
 
  gulp.src(src+'/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest(dst))
});

//Watch task
gulp.task('default',function() {
	connect.server({ root: dst,
    livereload: true,
	port: 8888});
    gulp.watch(src+'/sass/**/*.sass',['styles']);
	gulp.watch(src+'/css/**/*.css',['styleCss']);
	gulp.watch(src+'/js/**/*.js',['compressJS']);
	gulp.watch(src+'/**/*.jade',['templates']);	
	gulp.watch(dst+'/**/*.html',['reloadHTML']);
	gulp.watch(dst+'/js/**/*.js',['reloadHTML']);
	gulp.watch(dst+'/css/**/*.css',['reloadHTML']);
});