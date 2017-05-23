const gulp = require('gulp');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const paths = {
	html: ['src/frontend/index.html'],
	js: ['js/*.js']
};

gulp.task('html', function () {
	return gulp.src(paths.html)
		.pipe(reload({stream:true}));
});

gulp.task('js', function () {
	return gulp.src(paths.js)
		.pipe(reload({stream:true}));
});

gulp.task('browserSync', function () {
	browserSync({
		server: {
			baseDir: "./"
		},
		port: 8080,
		open: true,
		notify: false
	});
});

gulp.task('watcher', function () {
	gulp.watch(paths.js, gulp.series('js'));
	gulp.watch(paths.html, gulp.series('html'));
});

gulp.task('default', gulp.parallel('watcher', 'browserSync'));