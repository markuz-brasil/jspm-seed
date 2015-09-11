require('babel/register')({
  // // Optional ignore regex - if any filenames **do** match this regex then they
  // // aren't compiled
  // ignore: /regex/,

  // // Optional only regex - if any filenames **don't** match this regex then they
  // // aren't compiled
  // only: /my_es6_folder/,
  // // See options above for usage
  // whitelist: [],
  // blacklist: [],
  // Setting this will remove the currently hooked extensions of .es6, `.es`, `.jsx`
  // and .js so you'll have to add them back if you want them to be used again.
  // stage: 0,
  // compact: false,
  // optional: [
  //   'runtime', // make our code base suitable to be a library
  //   'utility.inlineEnvironmentVariables',
  //   'spec.undefinedToVoid',
  //   'validation.undeclaredVariableCheck',
  // ],
  // env: {
  //   production: {},
  //   development: {},
  //   debug: {},
  // },
  // extensions: ['.es6', '.es', '.jsx', '.js'],

})


main()
function main () {
  process.on('SIGSEGV', function () {
    console.log('------ SIGSEGV ----', arguments)
  })

  if ('darwin' === process.platform) {
    var segFaultHandler = require('segfault-handler')
    segFaultHandler.registerHandler()
  }

  require('./tasks')
}
