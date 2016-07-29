var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var minify = require('gulp-minify');
var htmlmin = require('gulp-htmlmin');
var connect = require('gulp-connect');
var uncss = require('gulp-uncss');
var src = 'app';
var dst = 'dist';

gulp.task('styles', function() {
    gulp.src(src+'/sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
		.pipe(cssmin())
		.pipe(uncss({
            html: [dst+'/html/index.html']
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(dst+'/css/'));
});

gulp.task('styleCss', function() {
    gulp.src(src+'/css/**/*.css')
		.pipe(uncss({
            html: [dst+'/html/index.html']
        }))
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
 
gulp.task('minifyHTML', function() {
  return gulp.src(src+'/html/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(dst+'/html'))
	.pipe(connect.reload());
});

gulp.task('reloadHTML', function() {
  return gulp.src(dst+'/html/**/*.html')
	.pipe(connect.reload());
});

//Watch task
gulp.task('default',function() {
	connect.server({ root: dst,
    livereload: true,
	port: 8888});
    gulp.watch(src+'/sass/**/*.sass',['styles']);
	gulp.watch(src+'/css/**/*.css',['styleCss']);
	gulp.watch(src+'/js/**/*.js',['compressJS']);
	gulp.watch(src+'/html/**/*.html',['styles', 'styleCss', 'minifyHTML']);
	gulp.watch(dst+'/css/**/*.css',['reloadHTML']);
});