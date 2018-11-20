import * as accountActions from '../actions/account';

const initialState = {}
const account = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case accountActions.ACCOUNT_AUTH_REQUEST:
    case accountActions.FETCH_ACCOUNT_INFO_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case accountActions.FETCH_ACCOUNT_INFO_SUCCESS:
    case accountActions.ACCOUNT_AUTH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.payload,
      }
    case accountActions.ACCOUNT_AUTH_ERROR:
    case accountActions.FETCH_ACCOUNT_INFO_ERROR:
      return {
        ...state,
        isFetching: false,
      }
    case accountActions.ACCOUNT_LOGOUT:
      return {
        ...state,
        user: null,
      }
    default:
      return state;
  }
};

export default account;