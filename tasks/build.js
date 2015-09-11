import gulp from 'gulp'
import pngquant from 'imagemin-pngquant'
import gulpLoadPlugins from 'gulp-load-plugins'

import CFG from './config-tasks'
const $ = gulpLoadPlugins()


// Build HTML for distribution.
gulp.task('bundle-html', _ => {
  return gulp.src(CFG.html)
    .pipe($.replace('lib/system.js', 'app.min.js'))
    .pipe($.replace('<script src="config.js"></script>', ''))
    .pipe($.replace("<script>System.import('./app')</script>", ''))
    .pipe($.minifyHtml())
    .pipe(gulp.dest(CFG.dist))
})

const jspmApp = `FORCE_COLOR=true jspm bundle-sfx ${CFG.cacheClient}/app ${CFG.dist}/app.min.js --minify --skip-source-maps`
gulp.task('jspm-app', $.shell.task(jspmApp))

const jspmSpecs = `FORCE_COLOR=true jspm bundle-sfx ${CFG.cacheClient}/specs ${CFG.dist}/specs.min.js --minify --skip-source-maps`
gulp.task('jspm-specs', $.shell.task(jspmSpecs))

gulp.task('pre-bundle-js', _ => {
  return gulp.src('./tasks/config-jspm-bundle.js')
    .pipe($.rename(p => p.basename = 'config'))
    .pipe(gulp.dest(CFG.cache))
})

gulp.task('bundle-js', gulp.series('pre-bundle-js', 'jspm-app'))
gulp.task('bundle-specs', gulp.series('pre-bundle-js', 'jspm-specs'))

// Build images for distribution.
gulp.task('bundle-img', _ => {
  return gulp.src(CFG.img)
    .pipe($.imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngquant()],
    }))
    .pipe(gulp.dest(CFG.dist + '/img'))
})

// Build JS for distribution.
gulp.task('bundle', gulp.series('js', gulp.parallel('bundle-js', 'bundle-html', 'bundle-img')))

