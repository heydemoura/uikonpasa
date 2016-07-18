var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var templateCache = require('gulp-angular-templatecache');

gulp.task('build-js', function() {
	gulp.src(['src/templates/**/*.tpl.html'])
	.pipe(templateCache({module: 'uiKonpasaTemplates'}))
	.pipe(gulp.dest('tmp'));

	gulp.src(['src/js/*.js', 'tmp/*.js'])
	.pipe(concat('uiKonpasa.js'))
	.pipe(uglify())
	.pipe(gulp.dest('build/'));
});


gulp.task('default', ['build-js']);