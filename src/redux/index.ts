import { combineReducers } from 'redux';
import userReducer from './userRedux';
import appReducer from './appRedux';

const rootReducer = combineReducers({
  user: userReducer,
  application: appReducer,
});

export default rootReducer;
