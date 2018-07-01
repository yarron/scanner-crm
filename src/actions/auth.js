import {
  FETCH_AUTH_REQUEST,
  FETCH_AUTH_SUCCESS,
  FETCH_AUTH_FAILURE,
} from './constants/auth';

export const fetchAuthRequest = password => ({
  type: FETCH_AUTH_REQUEST,
  payload: { password },
});

export const fetchAuthSuccess = payload => ({
  type: FETCH_AUTH_SUCCESS,
  payload,
});

export const fetchAuthFailure = error => ({
  type: FETCH_AUTH_FAILURE,
  payload: { error },
});
