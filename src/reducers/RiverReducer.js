import {
  RIVERS_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RIVERS_FETCH_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};





// export default (state = [], action) => {
//   switch (action.type) {
//     case 'RIVER_SELECTED':
//       return [...state, action.payload];
//     default:
//       return state;
//   }
// };
