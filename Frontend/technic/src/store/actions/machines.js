import { post, get, ADD_MACHINE } from '../../utils/api';

export const ADD_MACHINE_REQUEST = 'ADD_MACHINE_REQUEST';
export const ADD_MACHINE_SUCCESS = 'ADD_MACHINE_SUCCESS';
export const ADD_MACHINE_ERROR = 'ADD_MACHINE_ERROR';
export const addMachine = (machine) => async (dispatch) => {
  dispatch({ type: ADD_MACHINE_REQUEST });

  try {
    await post(ADD_MACHINE, machine);
    dispatch({ type: ADD_MACHINE_SUCCESS, payload: machine });
  }
  catch (err) {
    let message = 'Прозошла ошибка';

    if (err.response !== undefined) {
      message = err.response.data;
    }
    console.log(message);
    dispatch({ type: ADD_MACHINE_ERROR, payload: message });
    throw new Error(message);
  }
}