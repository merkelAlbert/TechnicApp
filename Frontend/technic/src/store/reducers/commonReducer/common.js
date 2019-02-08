import { RESET_COMMON_STATE } from '../../actions/service';

const initialState = {
  isFetching: false,
  error: '',
  isSuccess: false
};

const common = actions => (state = initialState, action) => {
  if (actions.request && actions.request.includes(action.type)) {
    return {
      ...state,
      isFetching: true,
      error: '',
      isSuccess: false
    };
  }
  if (actions.success && actions.success.includes(action.type)) {
    return {
      ...state,
      isFetching: false,
      error: '',
      isSuccess: true
    };
  }
  if (actions.error && actions.error.includes(action.type)) {
    return {
      ...state,
      isFetching: false,
      error: action.payload,
      isSuccess: false
    };
  }
  if (action.type === RESET_COMMON_STATE) {
    return initialState;
  }

  return state;
};

export default common;
