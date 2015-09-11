import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import { obj as thr } from 'through2'

const $ = gulpLoadPlugins()
import CFG from './config-tasks'

const log = $.util.log
const red = $.util.colors.red
const cyan = $.util.colors.cyan
// const green = $.util.colors.green
const mag = $.util.colors.magenta
const bold = $.util.colors.bold

gulp.task('compile-js', done => {
  return gulp.src(CFG.js)
    .pipe($.cached('compile-js', { optimizeMemory: true }))
    .pipe(shortCircuit(done))
    .pipe($.if(!CFG.is.build, $.sourcemaps.init()))
    .pipe($.babel(babelCfg)).on('error', logerr)
    .pipe($.if(!CFG.is.build, $.sourcemaps.write()))
    .pipe(gulp.dest(CFG.cacheClient))
    .pipe($.if(isNotSpecFile, $.connect.reload()))
})

gulp.task('flow', done => {

  return gulp.src(CFG.js)
    .pipe($.cached('flow', { optimizeMemory: true }))
    .pipe(shortCircuit(done))
    // pre processing js assets to help flowtype until it supports ES2015
    // and skipping it for the build tasks
    .pipe($.babel(flowBabelCfg)).on('error', logerr)
    .pipe(gulp.dest(`${CFG.cache}/flowtype`))
    .pipe($.flowtype(flowReporter()))

})

gulp.task('pre-compile-js', _ => {
  return gulp.src('./tasks/config-jspm.js')
    .pipe($.cached('pre-compile-js', { optimizeMemory: true }))
    .pipe($.rename(p => p.basename = 'config'))
    .pipe(gulp.dest(`${CFG.cacheDev}`))
})

gulp.task('js', gulp.series('pre-compile-js', 'compile-js'))

function isNotSpecFile (vfs) {
  return !vfs.path.match(/.*spec.*/)
}

function shortCircuit (done) {
  let changed = false
  return thr((vfs, enc, next) => {
    changed = true
    next(null, vfs)
  }, cb => {
    if (!changed) { return done() }
    cb()
  })
}

function logerr (err) {
  console.log('')
  console.log(err.message)
  console.log(err.codeFrame)
}

function flowReporter () {
  return {
    reporter: {
      reporter: msgs => {
        let msg = msgs.map(({ file, error }) => {
          return `\n${mag(file)}\n  line: ${bold(error.line)}\tchar: ${bold(error.character)}  ${cyan(error.reason)}`
        }).join('')

        if (msgs.length > 0) {
          console.log(msg, '\n')
          log(red(`${msgs.length} flowtype errors`))
        }
      },
    },
  }
}

const flowBabelCfg = {
  stage: 1,
  compact: false,
  blacklist: [
    'flow',
    'react',

    'es6.arrowFunctions',
    // 'es6.blockScoping',
    'es6.classes',
    'es6.constants',
    'es6.destructuring',
    // 'es6.forOf',
    'es6.modules',
    // 'es6.parameters',
    'es6.properties.computed',
    'es6.properties.shorthand',
    'es6.spread',
    'es6.tailCall',
    'es6.templateLiterals',
    'es6.regex.unicode',
    'es6.regex.sticky',

    // 'es7.asyncFunctions',
    // 'es7.classProperties',
    // 'es7.comprehensions',
    // 'es7.decorators',
    // 'es7.doExpressions',
    // 'es7.exponentiationOperator',
    // 'es7.exportExtensions',
    // 'es7.functionBind',
    // 'es7.objectRestSpread',
    // 'es7.trailingFunctionCommas',

  ],
  // plugins: ['flow-comments'],
  // modules: 'system',
  env: {
    production: {},
    development: {},
    debug: {},
  },
}

const babelCfg = {
  stage: 1,
  compact: false,
  blacklist: [],
  jsxPragma: 'hJSX',
  optional: [
    'runtime',
    'utility.inlineEnvironmentVariables',
    'spec.undefinedToVoid',
    'validation.undeclaredVariableCheck',
    'optimisation.modules.system',

  ],
  modules: 'system',
  env: {
    production: {},
    development: {},
    debug: {},
  },
}

