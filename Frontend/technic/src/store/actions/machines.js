import { post, get, MACHINES } from '../../utils/api';

export const ADD_MACHINE_REQUEST = 'ADD_MACHINE_REQUEST';
export const ADD_MACHINE_SUCCESS = 'ADD_MACHINE_SUCCESS';
export const ADD_MACHINE_ERROR = 'ADD_MACHINE_ERROR';
export const add = machine => async dispatch => {
  dispatch({ type: ADD_MACHINE_REQUEST });

  try {
    const data = await post(MACHINES, machine);
    dispatch({ type: ADD_MACHINE_SUCCESS, payload: data });
  } catch (err) {
    let message = 'Прозошла ошибка';

    if (err.response !== undefined) {
      message = err.response.data;
    }
    console.log(message);
    dispatch({ type: ADD_MACHINE_ERROR, payload: message });
    throw new Error(message);
  }
};

export const FETCH_ALL_REQUEST = 'machines/FETCH_ALL_REQUEST';
export const FETCH_ALL_SUCCESS = 'machines/FETCH_ALL_SUCCESS';
export const FETCH_ALL_ERROR = 'machines/FETCH_ALL_ERROR';
export const fetchAll = () => async dispatch => {
  dispatch({ type: FETCH_ALL_REQUEST });

  try {
    const data = await get(MACHINES);
    dispatch({ type: FETCH_ALL_SUCCESS, payload: data });
  } catch (err) {
    let message = 'Прозошла ошибка';

    if (err.response !== undefined) {
      message = err.response.data;
    }
    console.log(message);
    dispatch({ type: FETCH_ALL_ERROR, payload: message });
    throw new Error(message);
  }
};
