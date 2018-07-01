// Use babel-register to precompile ES6 syntax
require('babel-register');

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');

const NODE_SSR = process.env.NODE_SSR === 'true';
// Setup global variables for server

global.__CLIENT__ = !NODE_SSR;
global.__SERVER__ = NODE_SSR;
global.__DISABLE_SSR__ = !NODE_SSR; // Disable server side render here
global.__DEV__ = process.env.NODE_ENV !== 'production';

// This should be the same with webpack context
const dirRoot = require('path').join(process.cwd());

// Settings of webpack-isomorphic-tools
global.webpackIsomorphicTools =
  new WebpackIsomorphicTools(require('./tools/webpack/WIT.config')).server(dirRoot, () => require('./src/server'));
