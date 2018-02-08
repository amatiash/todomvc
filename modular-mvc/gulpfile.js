'use strict';

let gulp    = require('gulp'),
    refresh = require('gulp-refresh'),
    connect = require('gulp-connect'),
    config  = {
        js  : {
            watch: ['js/bundle/*.js']
        },
        html: {
            watch : ['*.html'],
            public: {
                src : ['index.html'],
                dist: 'public'
            }
        }
    };

gulp.task('watch', function(){
    refresh.listen();
    gulp.watch(config.html.watch, ['html:watch']);
    gulp.watch(config.js.watch, ['js:watch']);
});

gulp.task('html:watch', function(){
    gulp.src(config.html.watch)
        .pipe(refresh());
});

gulp.task('js:watch', function(){
    gulp.src(config.js.watch)
        .pipe(refresh());
});

gulp.task('connect', function(){
    connect.server({
        root      : './',
        port      : 9797,
        livereload: true
    });
});

gulp.task('default', ['connect', 'watch']);

