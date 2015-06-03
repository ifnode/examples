var gulp = require('gulp'),
    sass = require('gulp-sass');

module.exports = function(options) {
    return function() {
        gulp.src(options.src)
            .pipe(sass(options.config || {}))
            .pipe(gulp.dest(options.dest));
    };
};
