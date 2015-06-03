var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

module.exports = function(options) {
    return function() {
        gulp.src(options.src)
            .pipe(uglify(options.config || {}))
            .pipe(rename(options.filename))
            .pipe(gulp.dest(options.dest))
    };
};
