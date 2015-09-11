System.config({
  baseURL: "_cache",
  defaultJSExtensions: true,
  transpiler: 'babel',
  babelOptions: {
    stage: 1,
    compact: false,
    blacklist: [],
    // jsxPragma: 'h',
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
  },
  paths: {
    "github:*": "../_cache/lib/github/*",
    "npm:*": "../_cache/lib/npm/*"
  },

  map: {
    "babel": "npm:babel-core@5.8.24",
    "babel-runtime": "npm:babel-runtime@5.8.20",
    "core-js": "npm:core-js@0.9.18",
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:babel-runtime@5.8.20": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@0.9.18": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    }
  }
});
