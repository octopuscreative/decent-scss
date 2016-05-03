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
    stylelint     = require('gulp-stylelint');


gulp.task('browserSync', function() {
  browserSync({
    server: { baseDir: "./" },
    reloadDelay: 1000,
    notify: false
  });
});

gulp.task('stylelint', function() {
  return gulp.src(['./src/scss/**/*.scss'])
    .pipe(stylelint({
      configFile: './.stylelintrc',
      syntax: 'scss',
      reporters: [
        {formatter: 'string', console: true}
      ]
    }))
});

gulp.task('styles', function() {
  return gulp.src('src/scss/init.scss')
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(sassGlob())
    .pipe(sass({
      errLogToConsole: true,
      includePaths: [ 'src/scss/' ]
    }))
    .pipe(autoprefixer({
      browsers: autoPrefixBrowserList,
      cascade:  true
    }))
    .on('error', gutil.log)
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('src'))
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
    './src/*.css'
  ])
  .pipe(gulp.dest('./dist'));
});


gulp.task('default', ['styles', 'browserSync', 'copy-util'], function() {
  gulp.watch('src/scss/**', ['stylelint', 'styles', 'copy-util']);
  gulp.watch('src/*.html', ['html']);
  gulp.watch();
});
