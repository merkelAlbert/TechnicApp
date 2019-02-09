import * as machineTypesActions from '../actions/machineTypes';
import { USER_LOGOUT } from '../actions/service';
import initialState from '../initialState';

const machineTypes = (state = initialState.machineTypes, action) => {
  switch (action.type) {
    case machineTypesActions.FETCH_ALL_SUCCESS:
      return action.payload ? action.payload : state;
    case USER_LOGOUT:
      return initialState.machineTypes;
    default:
      return state;
  }
};

export default machineTypes;
