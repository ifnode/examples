var gulp = require('gulp'),
    rename = require('gulp-rename'),
    browserify = require('gulp-browserify');

module.exports = function(options) {
    return function() {
        var instance = gulp.src(options.src)
            .pipe(browserify(options.config || {}))
            .pipe(rename(options.bundle_name))
            .pipe(gulp.dest(options.dest));

        //instance.on('end', function() {
        //    gulp.run('make-user-script');
        //});
    };
};
