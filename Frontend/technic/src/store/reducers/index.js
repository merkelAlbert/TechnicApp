import user from './user';
import machines from './machines';
import machineTypes from './machineTypes';
import files from './files';
import common from './commonReducer';

const rootReducer = {
  common,
  user,
  machines,
  machineTypes,
  files
};

export default rootReducer;