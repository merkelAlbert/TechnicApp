import * as userActions from '../actions/user';
import { USER_LOGOUT } from '../actions/service';
import initialState from '../initialState';

const user = (state = initialState.user, action) => {
  switch (action.type) {
    case userActions.FETCH_USER_INFO_SUCCESS:
    case userActions.USER_AUTH_SUCCESS:
      return action.payload ? action.payload : state;
    case USER_LOGOUT:
      return initialState.user;
    default:
      return state;
  }
};

export default user;
