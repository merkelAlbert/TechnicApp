import * as ordersActions from '../actions/orders';
import { USER_LOGOUT } from '../actions/service';
import initialState from '../initialState';

const orders = (state = initialState.orders, action) => {
  switch (action.type) {
    case ordersActions.ADD_ORDER_SUCCESS:
      return action.payload
        ? { ...state, list: [action.payload, ...state.list] }
        : state;
    case ordersActions.FETCH_ALL_SUCCESS:
      return action.payload ? { ...state, list: action.payload } : state;
    case ordersActions.FETCH_ONE_SUCCESS:
      return action.payload ? { ...state, active: action.payload } : state;
    case ordersActions.FETCH_ONE_ERROR:
      return { ...state, active: {} };
    case ordersActions.UPDATE_ORDER_SUCCESS:
      return action.payload
        ? {
            ...state,
            list: state.list.map(order => {
              if (order.id !== action.payload.id) {
                return order;
              }
              return action.payload;
            }),
            active: {}
          }
        : state;
    case ordersActions.REMOVE_ORDER_SUCCESS:
      return action.payload
        ? {
            ...state,
            list: state.list.filter(order => order.id !== action.payload),
            active: {}
          }
        : state;
    case USER_LOGOUT:
      return initialState.orders;
    default:
      return state;
  }
};

export default orders;
