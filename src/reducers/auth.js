import {
  FETCH_AUTH_REQUEST,
  FETCH_AUTH_SUCCESS,
  FETCH_AUTH_FAILURE,
} from '_actions/constants/auth';

const initialState = {
  readyStatus: 'DEFAULT',
  isAuth: false,
  password: '',
  error: '',
  attempt: 5,
};

const cast = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_AUTH_SUCCESS:
      return {
        ...state,
        readyStatus: type,
        isAuth: true,
        error: '',
        attempt: 5,
      };
    case FETCH_AUTH_FAILURE:
      return {
        ...state,
        readyStatus: type,
        isAuth: false,
        error: `Не верно введен пароль! Осталось ${state.attempt - 1} попыток(ки)`,
        attempt: state.attempt - 1,
      };
    case FETCH_AUTH_REQUEST:
      return {
        ...state,
        readyStatus: type,
        ...payload,
      };
    default:
      return state;
  }
};

export default cast;
