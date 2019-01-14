import { post, get, FETCH_MACHINE_TYPES } from '../../utils/api';

export const FETCH_ALL_REQUEST = 'machineTypes/FETCH_ALL_REQUEST';
export const FETCH_ALL_SUCCESS = 'machineTypes/FETCH_ALL_SUCCESS';
export const FETCH_ALL_ERROR = 'machineTypes/FETCH_ALL_ERROR';
export const fetchAll = () => async (dispatch) => {
  dispatch({ type: FETCH_ALL_REQUEST });

  try {
    const machineTypes = await get(FETCH_MACHINE_TYPES);
    dispatch({ type: FETCH_ALL_SUCCESS, payload: machineTypes });
  }
  catch (err) {
    let message = 'Прозошла ошибка';

    if (err.response !== undefined) {
      message = err.response.data;
    }
    console.log(message);
    dispatch({ type: FETCH_ALL_ERROR, payload: message });
    throw new Error(message);
  }
}