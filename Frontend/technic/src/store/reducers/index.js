import user from './user';
import companies from './companies';
import machines from './machines';
import machineTypes from './machineTypes';
import files from './files';
import orders from './orders';
import common from './commonReducer';

const rootReducer = {
  common,
  user,
  companies,
  machines,
  machineTypes,
  files,
  orders
};

export default rootReducer;
