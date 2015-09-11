/*
 * gulpfile.js
 * ===========
 * Rather than manage one giant configuration file responsible
 * for creating multiple tasks, each task has been broken out into
 * its own file in the 'gulp' folder. Any files in that directory get
 *  automatically required below.
 *
 * To add a new task, simply add a new task file in that directory.
 */

import gulp from 'gulp'
import del from 'del'
import gulpLoadPlugins from 'gulp-load-plugins'
import CFG from './config-tasks'

// Require all tasks in the 'gulp' folder.

import './javascript'
import './build'
import './watch'

const $ = gulpLoadPlugins()

// Clean the dist folder
gulp.task('clean', del.bind(null, [`${CFG.dist}/*`, `${CFG.cache}/{client*,flowtype,config.js}`]))
gulp.task('clean-dev', del.bind(null, [`${CFG.cache}/{client*,flowtype}`]))
gulp.task('clean-build', del.bind(null, [`${CFG.dist}/*`, `${CFG.cache}/config.js`]))

// Start local dev server.
gulp.task('connect', _ => {
  $.connect.server({
    root: [
      CFG.cacheDev,
      CFG.cacheClient,
      CFG.cache,
      CFG.client,
    ],
    livereload: true,
  })
})

// Lint JS.
gulp.task('lint', _ => {
  return gulp.src(CFG.js)
    .pipe($.cached('lint', { optimizeMemory: true }))
    .pipe($.eslint())
    .pipe($.eslint.format())
})

// HTML livereload.
gulp.task('html', _ => {
  gulp.src(CFG.html)
    .pipe($.connect.reload())
})


gulp.task('dev', gulp.parallel('watch', 'flow', gulp.series('js', 'bundle-specs', 'connect')))

// Default task; start local server & watch for changes.
gulp.task('default', gulp.parallel('watch', 'flow', gulp.series('js', 'connect')))

// One build task to rule them all.
gulp.task('build', gulp.series('clean-build', 'compile-js', 'bundle'))

