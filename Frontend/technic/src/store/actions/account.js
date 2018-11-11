import { post, REGISTER } from '../../utils/api';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export const registerUser = (user) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    await post(REGISTER, user);
    dispatch({ type: REGISTER_SUCCESS });
  }
  catch (err) {
    const { data: message } = err.response || err;
    dispatch({ type: REGISTER_ERROR });
    throw new Error(message);
  }
}