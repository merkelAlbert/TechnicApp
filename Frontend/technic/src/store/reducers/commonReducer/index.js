import { combineReducers } from 'redux';

import user from './user';
import machines from './machines';
import machineTypes from './machineTypes';

export default combineReducers({
  user,
  machines,
  machineTypes,
});