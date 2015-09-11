import gulp from 'gulp'
import path from 'path'
import gulpLoadPlugins from 'gulp-load-plugins'

import CFG from './config-tasks'

const $ = gulpLoadPlugins()
const log = $.util.log
// const red = $.util.colors.red
// const cyan = $.util.colors.cyan
const green = $.util.colors.green
const mag = $.util.colors.magenta
// const bold = $.util.colors.bold
// Watch for changes.

gulp.task('watch', _ => {
  const jsTasks = CFG.is.specs ? gulp.series('js', 'bundle-specs') : gulp.series('js')

  gulp.watch(CFG.js, gulp.parallel('flow', jsTasks)).on('change', logChanges)
  gulp.watch(CFG.html, gulp.series('html')).on('change', logChanges)
})


gulp.task('watch:flow', _ => {
  gulp.watch(CFG.js, gulp.series('flow')).on('change', logChanges)
})

function logChanges (event) {
  console.log('')
  log(green(`File ${event.type}: ${mag(path.basename(event.path))}`))
}
