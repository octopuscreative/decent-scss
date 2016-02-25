var autoPrefixBrowserList = ['last 2 version'];

var gulp          = require('gulp'),
    gutil         = require('gulp-util'),
    coffee        = require('gulp-coffee'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglify'),
    sass          = require('gulp-sass'),
    sassGlob      = require('gulp-sass-glob'),
    sourceMaps    = require('gulp-sourcemaps'),
    imagemin      = require('gulp-imagemin'),
    minifyCSS     = require('gulp-minify-css'),
    browserSync   = require('browser-sync'),
    autoprefixer  = require('gulp-autoprefixer'),
    gulpSequence  = require('gulp-sequence').use(gulp),
    shell         = require('gulp-shell'),
    plumber       = require('gulp-plumber');


gulp.task('browserSync', function() {
  browserSync({
    server: { baseDir: "src/" },
    reloadDelay: 1000,
    notify: false
  });
});

gulp.task('images', function(tmp) {
  gulp.src(['src/images/*.jpg', 'src/images/*.png'])
    .pipe(plumber())
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(gulp.dest('src/images'));
});

gulp.task('coffee', function() {
  gulp.src('./src/scripts/**/*.coffee')
  .pipe(coffee({bare: true})
  .on('error', gutil.log))
  // .pipe(concat('app.js'))
  .pipe(gulp.dest('./src/scripts/compiled'));
  // .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', ['coffee'], function() {
  return gulp.src([
    './src/scripts/vendor/jquery.min.js',
    './src/scripts/vendor/timelinemax.min.js',
    './src/scripts/vendor/tweenmax.min.js',
    './src/scripts/vendor/scrollmagic.min.js',
    './src/scripts/vendor/jquery.scrollmagic.min.js',
    './src/scripts/vendor/gsap.scrollmagic.min.js',
    './src/scripts/vendor/jquery.gsap.min.js',
    // './src/scripts/vendor/animation.gsap.js',
    './src/scripts/vendor/ScrollToPlugin.js',
    './src/scripts/compiled/**/*.js'
    ])
    .pipe(concat('app.js'))
    .on('error', gutil.log)
    .pipe(gulp.dest('src/scripts'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('styles', function() {
  return gulp.src('src/stylesheets/scss/init.scss')
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(sourceMaps.init())
    .pipe(sassGlob())
    .pipe(sass({
      errLogToConsole: true,
      includePaths: [ 'src/stylesheets/scss/' ]
    }))
    .pipe(autoprefixer({
      browsers: autoPrefixBrowserList,
      cascade:  true
    }))
    .on('error', gutil.log)
    .pipe(concat('styles.css'))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('src/stylesheets'))
    .pipe(browserSync.reload({stream: true}));
});

// Refresh browser on html changes.
gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(plumber())
    .pipe(browserSync.reload({stream: true}))
    .on('error', gutil.log);
});

gulp.task('clean-dist', shell.task([ 
  'rm -rf ./dist' 
]));

// Copy the util stylesheets to a distribution folder.
gulp.task('copy-util', ['clean-dist'], function() {
  gulp.src([
    './src/stylesheets/scss/**/*'
  ])
  .pipe(gulp.dest('./dist'));
});

// This is our master task when you run `gulp` in CLI / Terminal.
// This is the main watcher to use when in active development, this will:
//  - startup the web server.
//  - start up browserSync.
//  - compress all scripts and SCSS files.
//  - watch files.
//  - copy files to the dist folder.

gulp.task('default', ['scripts', 'styles', 'browserSync', 'copy-util'], function() {
  gulp.watch(['src/scripts/src/vendor/**', 'src/scripts/**/*.coffee'], ['scripts']);
  gulp.watch('src/stylesheets/scss/**', ['styles', 'copy-util']);
  gulp.watch('src/images/**', ['images']);
  gulp.watch('src/*.html', ['html']);
  gulp.watch()
});