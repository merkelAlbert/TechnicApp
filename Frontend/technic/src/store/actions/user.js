import { post, get, REGISTER, LOGIN, USER_INFO } from '../../utils/api';

export const USER_AUTH_REQUEST = 'USER_AUTH_REQUEST';
export const USER_AUTH_SUCCESS = 'USER_AUTH_SUCCESS';
export const USER_AUTH_ERROR = 'USER_AUTH_ERROR';
export const USER_AUTH_FORM_RESET = 'USER_AUTH_FORM_RESET';
export const USER_LOGOUT = 'USER_LOGOUT';

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

export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: USER_LOGOUT });
}

export const FETCH_USER_INFO_REQUEST = 'FETCH_USER_INFO_REQUEST';
export const FETCH_USER_INFO_SUCCESS = 'FETCH_USER_INFO_SUCCESS';
export const FETCH_USER_INFO_ERROR = 'FETCH_USER_INFO_ERROR';

export const fetchOne = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_USER_INFO_REQUEST });

  try {
    const data = await get(USER_INFO, userId);
    dispatch({ type: FETCH_USER_INFO_SUCCESS, payload: data });
  }
  catch (err) {
    let message = 'Прозошла ошибка';

    if (err.response !== undefined) {
      message = err.response.data;
    }
    dispatch({ type: FETCH_USER_INFO_ERROR, payload: message });
  }
}
