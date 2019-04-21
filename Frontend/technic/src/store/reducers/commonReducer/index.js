import { combineReducers } from 'redux';

import user from './user';
import companies from './companies';
import machines from './machines';
import machineTypes from './machineTypes';
import files from './files';
import orders from './orders';

export default combineReducers({
  user,
  companies,
  machines,
  machineTypes,
  files,
  orders
});
