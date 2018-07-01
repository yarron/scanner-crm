import { takeLatest, all, call, put } from 'redux-saga/effects';

import { fetchTrackExternal, fetchOrdersExternal } from '_api/orders';
import { normalize } from '_api/normalize';

import {
  fetchTrackSuccess,
  fetchTrackFailure,
  fetchOrdersSuccess,
  fetchOrdersFailure,
} from '_actions/orders';

import {
  FETCH_TRACK_REQUEST,
  FETCH_ORDERS_REQUEST,
} from '_constants/orders';

export function* fetchSetTrack({ payload }) {
  try {
    const response = yield call(fetchTrackExternal, payload);

    if (response.data.success) {
      yield put(fetchTrackSuccess(response.data));
    } else if (response.data.error) {
      yield put(fetchTrackFailure(response.data.error));
    }
  } catch (err) {
    yield put(fetchTrackFailure(err));
  }
}

export function* fetchGetOrders() {
  try {
    const response = yield call(fetchOrdersExternal);

    if (response.data.success) {
      const normalizeData = normalize(response.data.orders);

      yield put(fetchOrdersSuccess(normalizeData));
    } else if (response.data.error) {
      yield put(fetchOrdersFailure(response.data.error));
    }
  } catch (err) {
    yield put(fetchOrdersFailure(err));
  }
}

export default function* () {
  yield all([
    takeLatest(FETCH_TRACK_REQUEST, fetchSetTrack),
    takeLatest(FETCH_ORDERS_REQUEST, fetchGetOrders),
  ]);
}
