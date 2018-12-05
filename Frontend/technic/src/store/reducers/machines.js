import * as machinesActions from '../actions/machines';
import initialState from '../initialState';

const machines = (state = initialState.machines, action) => {
  console.log(action);
  switch (action.type) {
    case machinesActions.ADD_MACHINE_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: '',
        isSuccess: false,
      }
    case machinesActions.ADD_MACHINE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        isSuccess: true,
        machines: [action.payload, ...machines],
      }
    case machinesActions.ADD_MACHINE_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
        isSuccess: false,
      }
    default:
      return state;
  }
};

export default machines;