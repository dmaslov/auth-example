var gulp = require('gulp'),
    concat = require('gulp-concat'),
    jsmin = require('gulp-jsmin');

var paths = {
    js: [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/hello/dist/hello.all.js',
      'dev/js/**/*.js'
    ]
};

gulp.task('js-minifier', function() {
    gulp.src(paths.js)
      .pipe(concat('all.js'))
      .pipe(jsmin())
      .pipe(gulp.dest('public/js'));
});

gulp.task('default', ['js-minifier']);
