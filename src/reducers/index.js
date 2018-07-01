import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import orders from './orders';
import auth from './auth';

const rootReducer = combineReducers({
  routing,
  orders,
  auth,
});

export default rootReducer;
