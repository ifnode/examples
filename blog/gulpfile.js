var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),

    bundle_script = require('./gulp-tasks/bundle-script'),
    bundle_style = require('./gulp-tasks/bundle-style'),

    config = {
        public_path: 'public/',
        assets_path: 'assets/',

        server_start_point: 'app.js',
        server_scripts_sources: [
            'config/**/*.js',
            'protected/**/*.js',
            'app.js'
        ],

        copy_files: {
            src_base: 'public/',
            src: [
                'public/fonts/**/*'
            ],
            dest: 'assets'
        },

        scripts_start_point: 'public/js/exports.js',
        scripts_sources: 'public/js/**/*.js',
        styles_sources: 'public/scss/**/*.scss',

        bundle_script_name: '~.js',
        bundle_style_name: '~.css',

        bundle_min_script_name: '~.min.js',
        bundle_min_style_name: '~.min.css'
    };

gulp.task('copy-files', function() {
    var copy_files = config.copy_files;

    return gulp.src(copy_files.src, { base: copy_files.src_base })
        .pipe(gulp.dest(copy_files.dest));
});
gulp.task('bundle-script', bundle_script({
    bundle_name: config.bundle_script_name,
    src: config.scripts_start_point,
    dest: config.assets_path + '/js'
}));
gulp.task('bundle-style', bundle_style({
    src: config.styles_sources,
    dest: config.assets_path + '/css',
    config: {
        outputStyle: 'compressed'
    }
}));

gulp.task('bundle', function() {
    gulp.run([
        'copy-files',
        'bundle-script',
        //'compress-script',
        'bundle-style'
    ]);
});

gulp.task('public-files-watch', function() {
    gulp.watch(config.scripts_sources, [
        'bundle-script',
        'compress-script'
    ]);
    gulp.watch(config.styles_sources, [
        'bundle-style'
    ]);
});
gulp.task('nodemon', function() {
    nodemon({
        script: config.server_start_point,
        watch: config.server_scripts_sources,
        ext: 'js',
        env: {
            'DEBUG': 'ifnode*,blog:*'
        }
    });
});
gulp.task('default', [
    'bundle',

    'public-files-watch',
    'nodemon'
]);
