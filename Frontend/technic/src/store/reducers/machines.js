import * as machinesActions from '../actions/machines';
import initialState from '../initialState';

const machines = (state = initialState.machines, action) => {
  switch (action.type) {
    case machinesActions.ADD_MACHINE_SUCCESS:
      return action.payload ? [action.payload, ...state] : state;
    case machinesActions.FETCH_ALL_SUCCESS:
      return action.payload ? [...action.payload, ...state] : state;
    default:
      return state;
  }
};

export default machines;
