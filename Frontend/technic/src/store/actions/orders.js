import { post, get, put, del, ORDERS } from '../../utils/api';

export const ADD_ORDER_REQUEST = 'ADD_ORDER_REQUEST';
export const ADD_ORDER_SUCCESS = 'ADD_ORDER_SUCCESS';
export const ADD_ORDER_ERROR = 'ADD_ORDER_ERROR';
export const add = order => async dispatch => {
  dispatch({ type: ADD_ORDER_REQUEST });

  try {
    const data = await post(ORDERS, order);
    dispatch({ type: ADD_ORDER_SUCCESS, payload: data });
    return data;
  } catch (err) {
    let message = 'Произошла ошибка';

    if (err.response !== undefined) {
      message = err.response.data;
    }
    console.log(message);
    dispatch({ type: ADD_ORDER_ERROR, payload: message });
    throw new Error(message);
  }
};

export const FETCH_ALL_REQUEST = 'orders/FETCH_ALL_REQUEST';
export const FETCH_ALL_SUCCESS = 'orders/FETCH_ALL_SUCCESS';
export const FETCH_ALL_ERROR = 'orders/FETCH_ALL_ERROR';
export const fetchAll = options => async dispatch => {
  dispatch({ type: FETCH_ALL_REQUEST });

  try {
    const data = await get(ORDERS, null, options);
    dispatch({ type: FETCH_ALL_SUCCESS, payload: data });
    return data;
  } catch (err) {
    let message = 'Произошла ошибка';

    if (err.response !== undefined) {
      message = err.response.data;
    }
    console.log(message);
    dispatch({ type: FETCH_ALL_ERROR, payload: message });
    throw new Error(message);
  }
};

export const FETCH_ONE_REQUEST = 'orders/FETCH_ONE_REQUEST';
export const FETCH_ONE_SUCCESS = 'orders/FETCH_ONE_SUCCESS';
export const FETCH_ONE_ERROR = 'orders/FETCH_ONE_ERROR';
export const fetchOne = id => async dispatch => {
  dispatch({ type: FETCH_ONE_REQUEST });

  try {
    const data = await get(ORDERS, id);
    dispatch({ type: FETCH_ONE_SUCCESS, payload: data });
    return data;
  } catch (err) {
    let message = 'Произошла ошибка';

    if (err.response !== undefined) {
      message = err.response.data;
    }
    console.log(message);
    dispatch({ type: FETCH_ONE_ERROR, payload: message });
    throw new Error(message);
  }
};

export const UPDATE_ORDER_REQUEST = 'UPDATE_ORDER_REQUEST';
export const UPDATE_ORDER_SUCCESS = 'UPDATE_ORDER_SUCCESS';
export const UPDATE_ORDER_ERROR = 'UPDATE_ORDER_ERROR';
export const update = (orderId, order) => async dispatch => {
  dispatch({ type: UPDATE_ORDER_REQUEST });

  try {
    const data = await put(ORDERS, orderId, order);
    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data });
    return data;
  } catch (err) {
    let message = 'Произошла ошибка';

    if (err.response !== undefined) {
      message = err.response.data;
    }
    console.log(message);
    dispatch({ type: UPDATE_ORDER_ERROR, payload: message });
    throw new Error(message);
  }
};

export const REMOVE_ORDER_REQUEST = 'REMOVE_ORDER_REQUEST';
export const REMOVE_ORDER_SUCCESS = 'REMOVE_ORDER_SUCCESS';
export const REMOVE_ORDER_ERROR = 'REMOVE_ORDER_ERROR';
export const remove = orderId => async dispatch => {
  dispatch({ type: REMOVE_ORDER_REQUEST });

  try {
    const data = await del(ORDERS, orderId);
    dispatch({ type: REMOVE_ORDER_SUCCESS, payload: data });
    return data;
  } catch (err) {
    let message = 'Произошла ошибка';

    if (err.response !== undefined) {
      message = err.response.data;
    }
    console.log(message);
    dispatch({ type: REMOVE_ORDER_ERROR, payload: message });
    throw new Error(message);
  }
};
