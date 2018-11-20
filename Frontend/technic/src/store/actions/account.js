import { post, get, REGISTER, LOGIN, USER_INFO } from '../../utils/api';

export const ACCOUNT_AUTH_REQUEST = 'ACCOUNT_AUTH_REQUEST';
export const ACCOUNT_AUTH_SUCCESS = 'ACCOUNT_AUTH_SUCCESS';
export const ACCOUNT_AUTH_ERROR = 'ACCOUN_AUTH_ERROR';
export const ACCOUNT_LOGOUT = 'ACCOUNT_LOGOUT';

export const register = (user) => async (dispatch) => {
  dispatch({ type: ACCOUNT_AUTH_REQUEST });

  try {
    await post(REGISTER, user);
    dispatch({ type: ACCOUNT_AUTH_SUCCESS });
  }
  catch (err) {
    let message = 'Прозошла ошибка';

    if (err.response !== undefined) {
      message = err.response.data;
    }
    dispatch({ type: ACCOUNT_AUTH_ERROR });
    throw new Error(message);
  }
}

export const login = (user) => async (dispatch) => {
  dispatch({ type: ACCOUNT_AUTH_REQUEST });

  try {
    const { token, user: userInfo } = await post(LOGIN, user);
    dispatch({ type: ACCOUNT_AUTH_SUCCESS, payload: userInfo });
    localStorage.setItem('token', token);
  }
  catch (err) {
    let message = 'Прозошла ошибка';

    if (err.response !== undefined) {
      message = err.response.data;
    }
    dispatch({ type: ACCOUNT_AUTH_ERROR });
    throw new Error(message);
  }
}

export const FETCH_ACCOUNT_INFO_REQUEST = 'FETCH_ACCOUNT_INFO_REQUEST';
export const FETCH_ACCOUNT_INFO_SUCCESS = 'FETCH_ACCOUNT_INFO_SUCCESS';
export const FETCH_ACCOUNT_INFO_ERROR = 'FETCH_ACCOUNT_INFO_ERROR';

export const getAccountInfo = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_ACCOUNT_INFO_REQUEST });

  try {
    const auth = true;
    const user = await get(USER_INFO, userId, auth);
    dispatch({ type: FETCH_ACCOUNT_INFO_SUCCESS, payload: user });
  }
  catch (err) {
    let message = 'Прозошла ошибка';

    if (err.response !== undefined) {
      message = err.response.data;
    }
    dispatch({ type: FETCH_ACCOUNT_INFO_ERROR });
    throw new Error(message);
  }
}
