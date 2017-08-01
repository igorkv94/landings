var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var uncss = require('gulp-uncss');
var clean = require('gulp-clean'); 
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var buffer = require('vinyl-buffer');
var imagemin = require('gulp-imagemin');
var merge = require('merge-stream');
var spritesmith = require('gulp.spritesmith');
var fileinclude = require('gulp-file-include');
var minify = require('gulp-minify');
var htmlmin = require('gulp-htmlmin');
var gutil = require('gulp-util');
var critical = require('critical').stream;
var src = 'app';
var dst = 'dist';

gulp.task('cleanCSS', function () {  
  return gulp.src(dst+'/css', {read: false})
    .pipe(clean());
});

gulp.task('concat-styles',['cleanCSS'], function() {
  return Promise.all([
    new Promise(function(resolve, reject) {
		gulp.src(src+'/scss/bootstrap.scss')
        .pipe(sass().on('error', sass.logError))
		.pipe(uncss({
		  html: [
			'http://localhost:8888/'
		  ],
			timeout: 1000,
			ignore: ['.in','.collapsing']
		}))
		.pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
		.pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .on('error', reject)
        .pipe(gulp.dest(dst+'/css/'))
        .on('end', resolve);	    }),
    new Promise(function(resolve, reject) {
		gulp.src(src+'/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
		.pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .on('error', reject)
        .pipe(gulp.dest(dst+'/css/'))
        .on('end', resolve);
    })
  ]).then(function () {
		    gulp.src(dst+'/css/*.css')
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(dst+'/css/'))
		.pipe(connect.reload());
  });
});


gulp.task('critical', function () {
    return gulp.src('dist/index.html')
        .pipe(critical({
			inline: true,
			base: 'dist/',
			css: ['dist/css/style.min.css'],
			dimensions: [{
			  width: 320,
			  height: 480
			},{
			  width: 768,
			  height: 1024
			},{
			  width: 1280,
			  height: 960
			}],
			dest: 'dist/critical.html',
			minify: true,
			extract: false,
			ignore: ['font-face']
			})) 
		.on('error', function(err) { gutil.log(gutil.colors.red(err.message)); });
});


gulp.task('cleanIMG', function () {  
  return gulp.src(dst+'/img', {read: false})
    .pipe(clean());
});

gulp.task('images',['cleanIMG'], function() {
    gulp.src(src+'/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest(dst+'/img/'))
});

gulp.task('html', function() {
    gulp.src(src+'/*.html')
        .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file'
            }))
		.pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(dst+"/"))
		.pipe(connect.reload());
});

gulp.task('js', function() {
    gulp.src(src+'/js/**/*')
        .pipe(minify({
			ext:{
				src:'-debug.js',
				min:'-min.js'
			},
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
		}))
		.pipe(gulp.dest(dst+'/js'));
});

gulp.task('fonts', function() {
    gulp.src([src+'/fonts/*'])
        .pipe(gulp.dest(dst+'/fonts/'))
});

gulp.task('sprite', function () {
  var spriteData = gulp.src(src+'/sprite/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: '_sprite.scss'
  }));
  // Pipe image stream through image optimizer and onto disk 
  var imgStream = spriteData.img
    // DEV: We must buffer our stream into a Buffer for `imagemin` 
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(gulp.dest(dst+"/img/"));
 
  var cssStream = spriteData.css
    .pipe(gulp.dest(src+'/scss/components/'));
 
  // Return a merged stream to handle both `end` events 
  return merge(imgStream, cssStream);
});

gulp.task('reloadHTML', function() {
  return gulp.src(dst+'/**/*.html')
	.pipe(connect.reload());
});

//Watch task
gulp.task('default',function() {
	connect.server({ root: dst,
    livereload: true,
	port: 8888});
    gulp.watch(src+'/scss/**/*.scss', ['concat-styles']);
	gulp.watch(src+'/js/**/*.js', ['js']);
	gulp.watch('img/**/*', {cwd: src}, ['images']);
	gulp.watch('fonts/**/*', {cwd: src}, ['fonts']);
	gulp.watch(src+'/**/*.html', ['html']);
});