import {
  CHANGE_STEP,
  CHANGE_CURRENT,
  FETCH_TRACK_REQUEST,
  FETCH_TRACK_SUCCESS,
  FETCH_TRACK_FAILURE,
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
} from './constants/orders';

export const changeStep = step => ({
  type: CHANGE_STEP,
  payload: { step },
});

export const changeCurrent = current => ({
  type: CHANGE_CURRENT,
  payload: { current },
});

export const fetchOrdersRequest = (id, track) => ({
  type: FETCH_ORDERS_REQUEST,
  payload: { id, track },
});

export const fetchOrdersSuccess = payload => ({
  type: FETCH_ORDERS_SUCCESS,
  payload,
});

export const fetchOrdersFailure = error => ({
  type: FETCH_ORDERS_FAILURE,
  payload: { error },
});

export const fetchTrackRequest = (id, track) => ({
  type: FETCH_TRACK_REQUEST,
  payload: { id, track },
});

export const fetchTrackSuccess = payload => ({
  type: FETCH_TRACK_SUCCESS,
  payload,
});

export const fetchTrackFailure = error => ({
  type: FETCH_TRACK_FAILURE,
  payload: { error },
});
