
// Specify paths & globbing patterns for tasks.

// console.log(process.argv)
const isBuild = process.argv.includes('build')
const isSpecs = process.argv.includes('dev')

export default {
  is: {
    build: isBuild,
    specs: isSpecs,
  },
  // HTML sources.
  'html': './client/*.html',
  // JS sources.
  'js': ['./client/**/*.js'],
  // Image sources.
  'img': './client/img/*',
  // Sources folder.
  'client': './client',
  // Distribution folder.
  'dist': './dist',
  // Cache folders. For speedy developement
  'cache': './_cache',
  'cacheClient': './_cache/client',
  'cacheDev': './_cache/client-dev',
}
