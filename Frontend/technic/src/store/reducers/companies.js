import * as companiesActions from '../actions/companies';
import { USER_LOGOUT } from '../actions/service';
import initialState from '../initialState';

const companies = (state = initialState.companies, action) => {
  switch (action.type) {
    case companiesActions.FETCH_ALL_REQUEST:
      return { ...state, list: [] };
    case companiesActions.FETCH_ALL_SUCCESS:
      return action.payload ? { ...state, list: action.payload } : state;
    case companiesActions.FETCH_ONE_SUCCESS:
      return action.payload ? { ...state, active: action.payload } : state;
    case companiesActions.FETCH_ONE_ERROR:
      return { ...state, active: {} };
    case USER_LOGOUT:
      return initialState.companies;
    default:
      return state;
  }
};

export default companies;
