import { post, FILES } from '../../utils/api';

export const ADD_FILES_REQUEST = 'ADD_FILES_REQUEST';
export const ADD_FILES_SUCCESS = 'ADD_FILES_SUCCESS';
export const ADD_FILES_ERROR = 'ADD_FILES_ERROR';
export const add = files => async dispatch => {
  dispatch({ type: ADD_FILES_REQUEST });

  try {
    const data = await post(FILES, files);
    dispatch({ type: ADD_FILES_SUCCESS, payload: data });
    return data;
  } catch (err) {
    let message = 'Произошла ошибка';

    if (err.response !== undefined) {
      message = err.response.data;
    }
    console.log(message);
    dispatch({ type: ADD_FILES_ERROR, payload: message });
    throw new Error(message);
  }
};