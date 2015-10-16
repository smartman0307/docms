var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    jasmineNode = require('gulp-jasmine-node');

gulp.task('develop', function () {
  nodemon({ script: 'server.js' })
    .on('restart', function () {
      console.log('restarted server!');
    });
});

gulp.task('test', function () {
    return gulp.src(['./tests/documentManagerSpec.js']).pipe(jasmineNode({
        timeout: 10000
    }));
});

gulp.task('default', ['test', 'develop'], function(){
  gulp.watch("server.js", ['develop', 'default']);
  gulp.watch("./tests/documentManagerSpec.js", ['test', 'default']);
});