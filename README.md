# ES16 + JSPM + Flow + Gulp + Mocha

> A boilerplate for developing ES16+ apps.

## JSPM

[JSPM](http://jspm.io/) is an all-in-one command line tool for package management, module loading and transpilation. Read more about it [here](http://www.joezimjs.com/javascript/simplifying-the-es6-workflow-with-jspm/) and [here](http://javascriptplayground.com/blog/2014/11/js-modules-jspm-systemjs/).

## Boilerplate Features

- Super Fast. No in-browser compilation
- Uses JSPM instead of Bower to manage packages
- Transpiles ES16+ automagically using [Babel](https://babeljs.io/) via JSPM
- Uses [SystemJS](https://github.com/systemjs/systemjs) to load modules via JSPM
- Uses [Flow](http://flowtype.org/) static type checker to develop like a boss
- Local dev server with [LiveReload](http://livereload.com/) using [Gulp Connect](https://github.com/avevlad/gulp-connect)
- Testing using [Karma](http://karma-runner.github.io/) with [Mocha](http://mochajs.org/) + [Chai](http://chaijs.com/) (bonus: write your tests in ES16+)
- Linting with [ESLint](http://eslint.org/)
- [Unlicensed](http://unlicense.org/)

## Usage

1. Clone this repo from `git clone https://github.com/markuz-brasil/jspm-seed`
2. Run `npm install` in the root directory
4. Run `npm start` to start the local dev server
5. Write an awesome app! ☺

## Testing

1. Run `npm test` to run tests continuously.
2. Run `npm karma` to run tests once.  
3. Point your browser to `http://localhost:9876/`


## Building

Run `npm run build` to build the app for distribution in the `dist` folder.

## Contributing

If you like this/find it useful/find a bug please open an [issue](https://github.com/markuz-brasil/jspm-seed) and, better yet, submit a Pull Request! ☺ Any and all help appreciated, thanks!

---

[No rights reserved](http://unlicense.org/).
