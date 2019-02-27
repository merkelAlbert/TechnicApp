import * as userActions from '../actions/user';
import { USER_LOGOUT } from '../actions/service';
import initialState from '../initialState';

const user = (state = initialState.user, action) => {
  switch (action.type) {
    case userActions.FETCH_ONE_SUCCESS:
    case userActions.USER_AUTH_SUCCESS:
    case userActions.UPDATE_USER_SUCCESS:
      return action.payload ? action.payload : state;
    case USER_LOGOUT:
      return initialState.user;
    default:
      return state;
  }
};

export default user;
