// Gulpfile
var gutil = require('gulp-util');
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('copy', function() {
  gulp.src('index.html')
  .pipe(gulp.dest('assets'))
});
gulp.task('log', function() {
  gutil.log('== My Log Task ==')
});

gulp.task('sass', function() {
  gulp.src('styles/main.scss')
  .pipe(sass({style: 'expanded'}))
    .on('error', gutil.log)
  .pipe(gulp.dest('assets'))
  .pipe(connect.reload())

});
var coffee = require('gulp-coffee');

gulp.task('coffee', function() {
  gulp.src('scripts/hello.coffee')
  .pipe(coffee({bare: true})
    .on('error', gutil.log))
  .pipe(gulp.dest('scripts'))
});


var uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('js', function() {
  gulp.src('scripts/*.js')
  .pipe(uglify())
  .pipe(concat('script.js'))
  .pipe(gulp.dest('assets'))
});

var connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  })
});

gulp.task('html', function() {
  gulp.src('index.html')
  .pipe(gulp.dest('assets'))

  .pipe(connect.reload())
});
// gulp.task('sassreload', function() {
//   gulp.src('styles/*.scss')
//   .pipe(connect.reload())
// });


var coffeeSources = ['scripts/hello.coffee'],
    jsSources = ['scripts/*.js'],
    sassSources = ['styles/*.scss'],
    htmlSources = ['**/*.html'],
    outputDir = 'assets';
    gulp.task('watch', function() {
  gulp.watch(coffeeSources, ['coffee']);
  gulp.watch(jsSources, ['js']);
  gulp.watch(sassSources, ['sass']);
  gulp.watch(htmlSources, ['html']);
});

gulp.task('default', ['html', 'coffee', 'js', 'sass', 'connect', 'watch']);
