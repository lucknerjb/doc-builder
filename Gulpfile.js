var gulp = require('gulp');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var less = require('gulp-less');
var path = require('path');

var unixTimestamp = Math.round(+new Date()/1000);

gulp.task('watch-cachebust-dev', ['cachebust-dev'], function() {
    gulp.watch(['./dist/*.js', './dist/*.css'], ['cachebust-dev']);
});

// @TODO: Need to cachebust for prod also.....
gulp.task('cachebust-dev', function() {
    gulp.src(['index.html'])
        .pipe(replace('{CACHEBUST_KEY}', Math.round(+new Date()/1000)))
        .pipe(gulp.dest('./dist'));
});

gulp.task('dashboard-fonts', function() {
    gulp.src(['./assets/dashboard/plugins/font-awesome/fonts/*'])
        .pipe(gulp.dest('./dist/dashboard/plugins/font-awesome/fonts/'));
    // gulp.src(['index.html'])
    //     .pipe(replace('{CACHEBUST_KEY}', Math.round(+new Date()/1000)))
    //     .pipe(gulp.dest('./dist'));
});

gulp.task('dashboard-images', function() {
    gulp.src(['./assets/dashboard/img/*'])
        .pipe(gulp.dest('./dist/dashboard/img/'));
});

gulp.task('shared-images', function() {
    gulp.src(['./assets/shared/images/**/*'])
        .pipe(gulp.dest('./dist/shared/images/'));
});

// Website JS
gulp.task('website-js', function() {
    return gulp.src([
        './assets/website/js/jquery-1.10.2.min.js',
        './assets/website/js/bootstrap/bootstrap.min.js',
        './assets/website/js/theme.js',
        './assets/dashboard/plugins/clampjs/clamp.min.js',
    ])
    .pipe(concat('website-all.js'))
    .pipe(gulp.dest('./dist/'));
});

// Website CSS
gulp.task('website-css', function() {
    return gulp.src([
        './assets/website/css/bootstrap/bootstrap.min.css',
        './assets/website/css/compiled/theme.css',
        './assets/website/css/vendor/font-awesome/4.3.0/font-awesome.min.css',
        './assets/website/css/vendor/animate.css',
        './assets/website/css/custom.css'
    ])
    .pipe(concat('website-all.css'))
    .pipe(gulp.dest('./dist/'));
});

// Dashboard JS
gulp.task('dashboard-js', function() {
    return gulp.src([
        './assets/dashboard/js/jquery-1.11.3.min.js',
        './assets/dashboard/bootstrap/js/bootstrap.min.js',
        './assets/dashboard/plugins/perfect-scrollbar/js/perfect-scrollbar.jquery.min.js',
        './assets/dashboard/plugins/datatables/datatables.min.js',
        './assets/dashboard/plugins/lockr/lockr.js',
        './assets/dashboard/plugins/reqwest/reqwest.min.js',
        './assets/dashboard/js/custom.js',
    ])
    .pipe(concat('dashboard-all.js'))
    .pipe(gulp.dest('./dist/'));
});

// Dashboard CSS
gulp.task('css', ['less'], function() {
    return gulp.src([
        './assets/dashboard/plugins/font-awesome/css/font-awesome.min.css',
        './assets/dashboard/plugins/perfect-scrollbar/css/perfect-scrollbar.min.css',
        './assets/dashboard/plugins/datatables/datatables.min.css',
        './assets/dashboard/css/styles.css',
        './assets/dashboard/css/custom.css',
        './dist/dashboard-styles.css',  // TODO: Need to put this elsewhere
    ])
    .pipe(concat('dashboard-all.css'))
    .pipe(gulp.dest('./dist/'));
});

// Dashboard Less
gulp.task('less', function () {
  return gulp.src('./public/stylesheets/*.less')
    // .pipe(less({
    //   paths: [ path.join(__dirname, 'less', 'includes') ]
    // }))
    .pipe(less())
    // TODO: Need to put this elsewhere
    // .pipe(concat('dashboard-styles.css'))
    .pipe(gulp.dest('./public/stylesheets/'));
});

// Authentication JS
gulp.task('authentication-js', function() {
    return gulp.src([
        './assets/authentication/js/jquery-2.1.0.min.js',
        './assets/authentication/js/bootstrap/bootstrap.min.js',
        './assets/dashboard/plugins/lockr/lockr.js',
    ])
    .pipe(concat('authentication-all.js'))
    .pipe(gulp.dest('./dist/'));
});

// Authentication CSS
gulp.task('authentication-css', function() {
    return gulp.src([
        './assets/authentication/css/bootstrap/bootstrap.min.css',
        './assets/authentication/css/compiled/theme.css',
        './assets/authentication/css/vendor/brankic.css',
        './assets/authentication/css/vendor/ionicons.min.css',
        './assets/authentication/css/vendor/font-awesome.min.css',
        './assets/authentication/css/custom_authentication.css'
    ])
    .pipe(concat('authentication-all.css'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build', [
    // 'js',
    // 'css',
    // 'fonts',
    // 'images',
]);


// gulp.task('build', [
//     // 'clean',
//     // 'styles',
//     // 'scripts',
//     // 'templates',
//     'vendors-js',
//     'vendors-css',
//     'fonts',
//     'modernizr',
//     // 'test'
// ]);

gulp.task('watch', ['build'], function () {
    // gulp.watch(['./assets/**/less/*.less'], ['dashboard-less', 'dashboard-css']);
    // gulp.watch(['./assets/**/js/*.js'], ['js']);
    // gulp.watch(['./assets/**/css/*.css'], ['css']);
    // gulp.watch(['./assets/dashboard/images/*'], ['images']);
    // gulp.watch(['./assets/dashboard/fonts/*'], ['fonts']);
});

gulp.task('default', ['build']);
