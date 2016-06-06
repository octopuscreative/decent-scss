var autoPrefixBrowserList = ['last 2 version'];

var gulp          = require('gulp'),
    gutil         = require('gulp-util'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglify'),
    sass          = require('gulp-sass'),
    sassGlob      = require('gulp-sass-glob'),
    minifyCSS     = require('gulp-minify-css'),
    browserSync   = require('browser-sync'),
    autoprefixer  = require('gulp-autoprefixer'),
    gulpSequence  = require('gulp-sequence').use(gulp),
    shell         = require('gulp-shell'),
    plumber       = require('gulp-plumber'),
    stylelint     = require('gulp-stylelint'),
    cssstats      = require('gulp-cssstats');


gulp.task('browserSync', function() {
  browserSync({
    server: { baseDir: './' },
    reloadDelay: 1000,
    notify: false
  });
});

gulp.task('stylelint', function() {
  return gulp.src(['./modules/**/*.scss'])
    .pipe(stylelint({
      configFile: './.stylelintrc',
      syntax: 'scss',
      reporters: [
        {formatter: 'string', console: true}
      ]
    }))
});

gulp.task('styles', function() {
  return gulp.src('./modules/all.scss')
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(sassGlob())
    .pipe(sass({
      errLogToConsole: true,
      includePaths: [ './modules/' ]
    }))
    .pipe(autoprefixer({
      browsers: autoPrefixBrowserList,
      cascade:  true
    }))
    .on('error', gutil.log)
    .pipe(concat('decent.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('stats', function() {
  return gulp.src('./css/decent.css')
  .pipe(cssstats())
  .pipe(gulp.dest('css'))
});

// Refresh browser on html changes.
gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(plumber())
    .pipe(browserSync.reload({stream: true}))
    .on('error', gutil.log);
});

gulp.task('default', ['styles', 'stats', 'browserSync'], function() {
  gulp.watch('src/scss/**', ['stylelint', 'styles', 'stats']);
  gulp.watch('src/*.html', ['html']);
  gulp.watch();
});
