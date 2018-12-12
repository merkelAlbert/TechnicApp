import * as machineTypesActions from '../actions/machineTypes';
import initialState from '../initialState';

const machineTypes = (state = initialState.machineTypes, action) => {
  switch (action.type) {
    case machineTypesActions.FETCH_ALL_SUCCESS:
      return action.payload?action.payload:state;
    default:
      return state;
  }
};

export default machineTypes;