import * as machinesActions from '../actions/machines';
import { USER_LOGOUT } from '../actions/service';
import initialState from '../initialState';

const machines = (state = initialState.machines, action) => {
  switch (action.type) {
    case machinesActions.ADD_MACHINE_SUCCESS:
      return action.payload
        ? { ...state, list: [action.payload, ...state.list] }
        : state;
    case machinesActions.FETCH_ALL_SUCCESS:
      return action.payload ? { ...state, list: action.payload } : state;
    case machinesActions.FETCH_ONE_SUCCESS:
      return action.payload ? { ...state, active: action.payload } : state;
    case USER_LOGOUT:
      return initialState.machines;
    default:
      return state;
  }
};

export default machines;
