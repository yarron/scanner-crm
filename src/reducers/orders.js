import {
  CHANGE_CURRENT,
  CHANGE_STEP,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_FAILURE,
  FETCH_TRACK_REQUEST,
  FETCH_TRACK_FAILURE,
  FETCH_TRACK_SUCCESS,
} from '_actions/constants/orders';

const initialState = {
  readyStatus: 'DEFAULT',
  step: 0,
  current: 0,
  byId: {},
  allIds: [],
  error: '',
};

const orders = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        readyStatus: type,
        byId: {
          ...state.byId,
          ...payload.byId,
        },
        allIds: [...new Set([...state.allIds, ...payload.allIds])],
      };
    case CHANGE_STEP:
    case CHANGE_CURRENT:
      return {
        ...state,
        ...payload,
      };
    case FETCH_ORDERS_FAILURE:
    case FETCH_TRACK_FAILURE:
      return {
        ...state,
        readyStatus: type,
        ...payload,
      };
    case FETCH_TRACK_SUCCESS:
      return {
        ...state,
        readyStatus: type,
        byId: {
          ...state.byId,
          [payload.id]: {
            ...state.byId[payload.id],
            ...payload,
            complete: true,
            date: Date.now(),
          },
        },
      };
    case FETCH_TRACK_REQUEST:
      return {
        ...state,
        step: 2,
        readyStatus: type,
        byId: {
          ...state.byId,
          [payload.id]: {
            ...state.byId[payload.id],
            ...payload,
          },
        },
      };
    case FETCH_ORDERS_REQUEST:
      return {
        ...state,
        readyStatus: type,
      };
    default:
      return state;
  }
};

export default orders;
