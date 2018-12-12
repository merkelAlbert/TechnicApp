import * as machinesActions from '../actions/machines';
import initialState from '../initialState';

const machines = (state = initialState.machines, action) => {
  switch (action.type) {
    case machinesActions.ADD_MACHINE_SUCCESS:
      return action.payload ? action.payload : state;
    default:
      return state;
  }
};

export default machines;