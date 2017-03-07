import {
  API_RIVERS_FETCH
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case API_RIVERS_FETCH:
      return { ...state, ...action.payload.data.value.timeSeries }
    default:
      return state;
  }
};
