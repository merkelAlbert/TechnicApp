import { post, REGISTER, LOGIN } from '../../utils/api';

export const ACCOUNT_REQUEST = 'ACCOUNT_REQUEST';
export const ACCOUNT_SUCCESS = 'ACCOUNT_SUCCESS';
export const ACCOUNT_ERROR = 'ACCOUNT_ERROR';

export const register = (user) => async (dispatch) => {
  dispatch({ type: ACCOUNT_REQUEST });

  try {
    await post(REGISTER, user);
    dispatch({ type: ACCOUNT_SUCCESS });
  }
  catch (err) {
    let message = 'Прозошла ошибка';

    if (err.response !== undefined) {
      message = err.response.data;
    }
    dispatch({ type: ACCOUNT_ERROR });
    throw new Error(message);
  }
}

export const login = (user) => async (dispatch) => {
  dispatch({ type: ACCOUNT_ERROR });

  try {
    await post(LOGIN, user);
    dispatch({ type: ACCOUNT_SUCCESS });
  }
  catch (err) {
    let message = 'Прозошла ошибка';

    if (err.response !== undefined) {
      message = err.response.data;
    }
    dispatch({ type: ACCOUNT_ERROR });
    throw new Error(message);
  }
}