import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import thunk from 'redux-thunk';
import axios from 'axios';

import rootReducer from '_reducers';
import { loadState, saveStateToLocal } from '../utils/loadState';

export default (history, initialState = loadState()) => {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [
    thunk.withExtraArgument(axios),
    routerMiddleware(history),
    sagaMiddleware,
  ];

  const composeEnhancers = (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  const enhancers = composeEnhancers(
    applyMiddleware(...middlewares),
  );

  const store = createStore(rootReducer, initialState, enhancers);
  store.subscribe(() => {
    saveStateToLocal({
      auth: store.getState().auth,
    });
  });
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      try {
        const nextReducer = require('../reducers').default;

        store.replaceReducer(nextReducer);
      } catch (error) {
        console.error(`Reducer hot reloading error ${error}`);
      }
    });
  }

  return store;
};
