// var fs = require('fs')
import CFG from './config-tasks'


module.exports = function (config) {
  // var reporters
  // var singleRun
  //
  // if (process.env.KARMA_CI) {
  //   reporters = ['dots', 'junit']
  //   singleRun = true
  //   console.log('Using CI configuration')
  // }
  // else {
  //   reporters = ['progress', 'coverage']
  //   singleRun = false
  // }

  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '.',
    // frameworks to use
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['progress',],

    // list of files / patterns to load in the browser
    files: [
      // 'node_modules/mocha/mocha.js',
      // 'node_modules/chai/chai.js',
      // 'node_modules/sinon-chai/lib/sinon-chai.js',
      // 'node_modules/sinon/pkg/sinon.js',
      // 'node_modules/babel-runtime/**/*.js',
      // '_temp/specs/globals/index.js',
      'dist/specs.min.js',
      // '_temp/templates.js',
      // '_temp/specs/common.js',
      // '_temp/specs/specs.js',
    ],

    client: {
      mocha: {
        reporter: 'html',
        ui: 'bdd',
      },
    },

    // browsers: [],

    // list of files to exclude
    exclude: [ ],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    // reporters: reporters,

    // junitReporter: {
    //   outputFile: 'karma-test-results.xml',
    // },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    // logLevel: config.LOG_DEBUG,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    // browsers: ['PhantomJS'],
    // browsers: ['Chrome'],

    /**
     * NOTE
     * Running tests in Phantom JS on the Devbox was becoming unreasonably
     * slow and crashing often.
     * Instead of running the tests in Phantom, you can run them in a
     * browser on your host machine by visiting http://192.168.69.2:9876
     * (Devboxes' IP address, Karma's port).
     */

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,

    // warn if tests take longer than 150 millis
    // reportSlowerThan: 150,
  })
}
