import user from './user';
import machines from './machines';
import machineTypes from './machineTypes';
import common from './commonReducer';

const rootReducer = {
  common,
  user,
  machines,
  machineTypes,
};

export default rootReducer;