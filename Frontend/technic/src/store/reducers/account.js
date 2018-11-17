import * as accountActions from '../actions/account';

const initialState = {}
const account = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case accountActions.ACCOUNT_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case accountActions.ACCOUNT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.payload,
      }
    case accountActions.ACCOUNT_ERROR:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state;
  }
};

export default account;