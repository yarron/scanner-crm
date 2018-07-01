import { externalRequest } from './request';

const CONFIG = require('_config').app;

const fetchAuthExternal = ({ password }) =>
  externalRequest(`${CONFIG.restApi}/auth_scanner/${password}`, {});

export default fetchAuthExternal;
