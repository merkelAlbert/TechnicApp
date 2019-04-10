import { combineReducers } from 'redux';

import user from './user';
import machines from './machines';
import machineTypes from './machineTypes';
import files from './files';
import orders from './orders';

export default combineReducers({
  user,
  machines,
  machineTypes,
  files,
  orders
});