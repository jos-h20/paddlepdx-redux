import { combineReducers } from 'redux';
import RiverListReducer from './RiverListReducer';
import RiverReducer from './RiverReducer';

const rootReducer = combineReducers({
  rivers: RiverListReducer,
  selectedRivers: RiverReducer
});

export default rootReducer;
