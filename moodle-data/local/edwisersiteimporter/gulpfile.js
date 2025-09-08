// Gulp.
var gulp = require('gulp');

// Sass/CSS stuff.
var gulpSass = require('gulp-sass');
var dartSass = require('sass');
var exec = require('gulp-exec');
var notify = require("gulp-notify");
var rename = require('gulp-rename');
var gulpStylelint = require('gulp-stylelint');
var mediaGroup = require('gulp-group-css-media-queries');
var mediaMerge = require('gulp-merge-media-queries');
var cleanCSS = require('gulp-clean-css');
var frep = require('gulp-frep');

const sass = gulpSass(dartSass);

// Check production mode.
// eslint-disable-next-line no-undef
var PRODUCTION = process.argv.includes('-production');
// var PRODUCTION = true;
// Pattern for newline replacement for windows development environment.
var pattern = [{
    pattern: /\\r\\n/g,
    replacement: '\\n'
}];


gulp.task('styles', function() {
    var task = gulp.src('styles/main.scss')
    .pipe(sass({
        outputStyle: 'compressed',
    }));
    if (PRODUCTION) {
        task = task.pipe(mediaMerge())
        .pipe(mediaGroup());
    }

    task = task.pipe(cleanCSS({compatibility: 'ie8'}));

    if (PRODUCTION) {
        task = task.pipe(frep(pattern));
    }
    return task.pipe(rename('style.css'))
    .pipe(gulp.dest('./'));
});

gulp.task('purge', gulp.series(function() {
    return gulp.src('.')
    .pipe(exec('php /var/www/remui/html/v40/admin/cli/purge_caches.php'))
    .pipe(notify('Purged All'));
}));

gulp.task('watch', function(done) {
    gulp.watch([
        './styles/**/*.scss',
    ], gulp.series('styles', 'purge'));
    done();
});

gulp.task('default', gulp.series('styles', 'purge', 'watch'));
