import * as accountActions from '../actions/account';

const initialState = {
  user: null,
  error: '',
  isFetching: false,
  success: false,
}
const account = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case accountActions.ACCOUNT_AUTH_REQUEST:
    case accountActions.FETCH_ACCOUNT_INFO_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: '',
        success: false,
      }
    case accountActions.FETCH_ACCOUNT_INFO_SUCCESS:
    case accountActions.ACCOUNT_AUTH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        success: true,
        user: action.payload,
      }
    case accountActions.ACCOUNT_AUTH_ERROR:
    case accountActions.FETCH_ACCOUNT_INFO_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
        success: false,
      }
    case accountActions.ACCOUNT_AUTH_FORM_RESET:
      return {
        ...state,
        error: '',
        isFetching: false,
        success: false,
      }
    case accountActions.ACCOUNT_LOGOUT:
      return {
        state: initialState,
      }
    default:
      return state;
  }
};

export default account;