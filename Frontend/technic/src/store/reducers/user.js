import * as userActions from '../actions/user';
import initialState from '../initialState';

const user = (state = initialState.user, action) => {
  console.log(action);
  switch (action.type) {
    case userActions.USER_AUTH_REQUEST:
    case userActions.FETCH_USER_INFO_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: '',
        isSuccess: false,
      }
    case userActions.FETCH_USER_INFO_SUCCESS:
    case userActions.USER_AUTH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        isSuccess: true,
        user: action.payload,
      }
    case userActions.USER_AUTH_ERROR:
    case userActions.FETCH_USER_INFO_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
        isSuccess: false,
      }
    case userActions.USER_AUTH_FORM_RESET:
      return {
        ...state,
        error: '',
        isFetching: false,
        isSuccess: false,
      }
    case userActions.USER_LOGOUT:
      return initialState.user;
    default:
      return state;
  }
};

export default user;