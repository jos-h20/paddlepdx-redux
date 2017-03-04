import {
  INITIAL_RIVER_LIST,
  RIVER_SELECT
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case INITIAL_RIVER_LIST:
      console.log(action.payload, 'payload from initial list')

      return action.payload;
    default:
      return state;
  }
};
