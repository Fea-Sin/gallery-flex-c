var gulp = require('gulp');

var concat = require('gulp-concat');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');

gulp.task('script', function() {
	return gulp.src('./src/*.js')
	           .pipe(uglify())
	           .pipe(rename({suffix: '.min'}))
	           .pipe(gulp.dest('./dist/'))
	           .pipe(notify({message: 'js压缩完成'}))
})

gulp.task('watch', function() {
	gulp.watch(['./src/*.js'], ['script'])
})

gulp.task('default', function() {
	gulp.start('script', 'watch')
})