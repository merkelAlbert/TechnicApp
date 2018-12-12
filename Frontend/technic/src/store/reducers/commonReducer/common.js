const initialState = {
  isFetching: false,
  error: '',
  isSuccess: false,
}

const common = actions => (state = initialState, action) => {
  console.log(action.type);
  if (actions.request && actions.request.includes(action.type)){
    return {
      ...state,
      isFetching: true,
      error: '',
      isSuccess: false,
    }
  }
  if (actions.success && actions.success.includes(action.type)){
    return {
      ...state,
      isFetching: false,
      error: '',
      isSuccess: true,
    }
  }
  if (actions.error && actions.error.includes(action.type)){
    return {
      ...state,
      isFetching: false,
      error: action.payload,
      isSuccess: false,
    }
  }
  if (actions.reset && actions.reset.includes(action.type)){
    return initialState;
  }
  //console.log(actions.request);
  return state;
}

export default common;
