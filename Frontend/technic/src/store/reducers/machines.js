import * as machinesActions from '../actions/machines';
import { USER_LOGOUT } from '../actions/service';
import initialState from '../initialState';

const machines = (state = initialState.machines, action) => {
  switch (action.type) {
    case machinesActions.FETCH_ALL_REQUEST:
      return { ...state, list: [] };
    case machinesActions.ADD_MACHINE_SUCCESS:
      return action.payload
        ? { ...state, list: [action.payload, ...state.list] }
        : state;
    case machinesActions.FETCH_ALL_SUCCESS:
      return action.payload ? { ...state, list: action.payload } : state;
    case machinesActions.FETCH_ONE_SUCCESS:
      return action.payload ? { ...state, active: action.payload } : state;
    case machinesActions.FETCH_ONE_ERROR:
      return { ...state, active: {} };
    case machinesActions.UPDATE_MACHINE_SUCCESS:
      return action.payload
        ? {
            ...state,
            list: state.list.map(machine => {
              if (machine.id !== action.payload.id) {
                return machine;
              }
              return action.payload;
            }),
            active: {}
          }
        : state;
    case machinesActions.REMOVE_MACHINE_SUCCESS:
      return action.payload
        ? {
            ...state,
            list: state.list.filter(machine => machine.id !== action.payload),
            active: {}
          }
        : state;
    case USER_LOGOUT:
      return initialState.machines;
    default:
      return state;
  }
};

export default machines;
