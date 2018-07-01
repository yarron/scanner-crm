import { takeEvery, put, call } from 'redux-saga/effects';
import * as actions from '_actions/auth';
import {
  FETCH_AUTH_REQUEST,
} from '_constants/auth';
import fetchAuthExternal from '_api/auth';

function* genAuthRequest({ payload }) {
  try {
    const response = yield call(fetchAuthExternal, payload);
    if (response.data.success) {
      yield put(actions.fetchAuthSuccess());
    } else if (response.data.error) {
      yield put(actions.fetchAuthFailure());
    }
  } catch (err) {
    yield put(actions.fetchAuthFailure(err));
  }
}

export default function* authSaga() {
  yield takeEvery(FETCH_AUTH_REQUEST, genAuthRequest);
}
