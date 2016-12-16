import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import RiverListReducer from './RiverListReducer';
import RiverReducer from './RiverReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  rivers: RiverListReducer,
  selectedRivers: RiverReducer
});

export default rootReducer;
