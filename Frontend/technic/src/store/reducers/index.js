import { combineReducers } from 'redux';
import user from './user';
import machines from './machines';

export default combineReducers({
  user,
  machines,
});