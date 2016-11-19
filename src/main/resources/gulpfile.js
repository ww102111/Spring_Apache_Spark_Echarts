var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');

// Set the banner content
var banner = ['/*!\n',
    ' * Material Design - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2016-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
].join('');

// Compile LESS files from /less into /css
gulp.task('less', function () {
    return gulp.src('less/app.less')
        .pipe(less())
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify compiled CSS
gulp.task('minify-css', ['less'], function () {
    return gulp.src('css/app.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('static/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify JS
gulp.task('minify-js', function () {
    return gulp.src('js/app.js')
    //        .pipe(uglify())
        .pipe(header(banner, {pkg: pkg}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('static/js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Copy static libraries from /node_modules into static
 gulp.task('copy', function () {
     gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
         .pipe(gulp.dest('static/bootstrap'))

     gulp.src(['node_modules/bootstrap-material-design/dist/**/*'])
         .pipe(gulp.dest('static/material'))

     gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
         .pipe(gulp.dest('static/jquery'))

     gulp.src(['node_modules/echarts/dist/echarts.min.js'])
         .pipe(gulp.dest('static/echarts'))

     gulp.src(['node_modules/magnific-popup/dist/*'])
         .pipe(gulp.dest('static/magnific-popup'))

     gulp.src(['node_modules/scrollreveal/dist/*.js'])
         .pipe(gulp.dest('static/scrollreveal'))

     gulp.src([
         'node_modules/font-awesome/**/*',
         '!node_modules/font-awesome/**/*.map',
         '!node_modules/font-awesome/.npmignore',
         '!node_modules/font-awesome/*.txt',
         '!node_modules/font-awesome/*.md',
         '!node_modules/font-awesome/*.json'
     ])
         .pipe(gulp.dest('static/font-awesome'))
 });

// Run everything
gulp.task('default', ['less', 'minify-css', 'minify-js', 'copy']);
// Configure the browserSync task
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: ''
        },
    })
})

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'less', 'minify-css', 'minify-js'], function () {
    gulp.watch('less/*.less', ['less']);
    gulp.watch('css/*.css', ['minify-css']);
    gulp.watch('js/*.js', ['minify-js']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
});