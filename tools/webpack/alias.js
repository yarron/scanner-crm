const path = require('path');

module.exports = {
  _constants: path.resolve(process.cwd(), 'src/actions/constants'),
  _actions: path.resolve(process.cwd(), 'src/actions'),
  _api: path.resolve(process.cwd(), 'src/api'),
  _sagas: path.resolve(process.cwd(), 'src/sagas'),
  _config: path.resolve(process.cwd(), 'src/config'),
  _reducers: path.resolve(process.cwd(), 'src/reducers'),
  _store: path.resolve(process.cwd(), 'src/store'),
  _pages: path.resolve(process.cwd(), 'src/pages'),
  _containers: path.resolve(process.cwd(), 'src/containers'),
  _components: path.resolve(process.cwd(), 'src/components'),
  _assets: path.resolve(process.cwd(), 'src/assets'),
  _selectors: path.resolve(process.cwd(), 'src/selectors'),
};
