import { all } from 'redux-saga/effects';

import orders from './orders';
import auth from './auth';

export default function* rootSaga() {
  yield all([
    orders(),
    auth(),
  ]);
}
