import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import RiverListReducer from './RiverListReducer';
import RiverReducer from './RiverReducer';
import ApiRiversReducer from './ApiRiversReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  rivers: RiverListReducer,
  selectedRivers: RiverReducer,
  apiRivers: ApiRiversReducer
});

export default rootReducer;
