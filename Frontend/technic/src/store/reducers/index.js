import user from './user';
import machines from './machines';
import machineTypes from './machineTypes';
import files from './files';
import orders from './orders';
import common from './commonReducer';

const rootReducer = {
  common,
  user,
  machines,
  machineTypes,
  files,
  orders
};

export default rootReducer;