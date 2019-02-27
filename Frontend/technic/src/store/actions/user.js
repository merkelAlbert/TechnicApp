import { post, get, put, REGISTER, LOGIN, USER } from '../../utils/api';

export const USER_AUTH_REQUEST = 'USER_AUTH_REQUEST';
export const USER_AUTH_SUCCESS = 'USER_AUTH_SUCCESS';
export const USER_AUTH_ERROR = 'USER_AUTH_ERROR';

export const register = (user) => async (dispatch) => {
  dispatch({ type: USER_AUTH_REQUEST });
  try {
    await post(REGISTER, user);
    dispatch({ type: USER_AUTH_SUCCESS });
  }
  catch (err) {
    let message = 'Прозошла ошибка';

    if (err.response !== undefined) {
      message = err.response.data;
    }
    dispatch({ type: USER_AUTH_ERROR, payload: message });
    throw new Error(message);
  }
}

export const login = (user) => async (dispatch) => {
  dispatch({ type: USER_AUTH_REQUEST });

  try {
    const { token, account: userInfo } = await post(LOGIN, user);
    dispatch({ type: USER_AUTH_SUCCESS, payload: userInfo });
    localStorage.setItem('token', token);
  }
  catch (err) {
    let message = 'Произошла ошибка';

    if (err.response !== undefined) {
      message = err.response.data;
    }
    dispatch({ type: USER_AUTH_ERROR, payload: message });
    throw new Error(message);
  }
}

export const FETCH_ONE_REQUEST = 'FETCH_ONE_REQUEST';
export const FETCH_ONE_SUCCESS = 'FETCH_ONE_SUCCESS';
export const FETCH_ONE_ERROR = 'FETCH_ONE_ERROR';

export const fetchOne = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_ONE_REQUEST });

  try {
    const data = await get(USER, userId);
    dispatch({ type: FETCH_ONE_SUCCESS, payload: data });
  }
  catch (err) {
    let message = 'Прозошла ошибка';

    if (err.response !== undefined) {
      message = err.response.data;
    }
    dispatch({ type: FETCH_ONE_ERROR, payload: message });
  }
}

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';
export const update = (userId, user) => async dispatch => {
  dispatch({ type: UPDATE_USER_REQUEST });

  try {
    const data = await put(USER, userId, user);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
  } catch (err) {
    let message = 'Прозошла ошибка';

    if (err.response !== undefined) {
      message = err.response.data;
    }
    console.log(message);
    dispatch({ type: UPDATE_USER_ERROR, payload: message });
    throw new Error(message);
  }
};