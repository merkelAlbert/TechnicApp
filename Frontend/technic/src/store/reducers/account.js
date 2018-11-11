import { ADD_USER } from '../actionTypes';
const initialState = {}

const account = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return action.payload
    default:
      return state;
  }
};

export default account;