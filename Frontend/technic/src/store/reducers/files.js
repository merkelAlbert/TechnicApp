import * as filesActions from '../actions/files';
import { USER_LOGOUT } from '../actions/service';
import initialState from '../initialState';

const files = (state = initialState.files, action) => {
  switch (action.type) {
    case filesActions.ADD_FILES_SUCCESS:
      return action.payload ? action.payload : state;
    case USER_LOGOUT:
      return initialState.files;
    default:
      return state;
  }
};

export default files;
