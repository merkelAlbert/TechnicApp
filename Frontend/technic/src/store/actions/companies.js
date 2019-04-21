import { post, get, put, del, COMPANIES } from '../../utils/api';

export const ADD_COMPANY_REQUEST = 'ADD_COMPANY_REQUEST';
export const ADD_COMPANY_SUCCESS = 'ADD_COMPANY_SUCCESS';
export const ADD_COMPANY_ERROR = 'ADD_COMPANY_ERROR';
export const add = company => async dispatch => {
  dispatch({ type: ADD_COMPANY_REQUEST });

  try {
    const data = await post(COMPANIES, company);
    dispatch({ type: ADD_COMPANY_SUCCESS, payload: data });
    return data;
  } catch (err) {
    let message = 'Произошла ошибка';

    if (err.response !== undefined) {
      message = err.response.data;
    }
    console.log(message);
    dispatch({ type: ADD_COMPANY_ERROR, payload: message });
    throw new Error(message);
  }
};

export const FETCH_ALL_REQUEST = 'companies/FETCH_ALL_REQUEST';
export const FETCH_ALL_SUCCESS = 'companies/FETCH_ALL_SUCCESS';
export const FETCH_ALL_ERROR = 'companies/FETCH_ALL_ERROR';
export const fetchAll = options => async dispatch => {
  dispatch({ type: FETCH_ALL_REQUEST });

  try {
    const data = await get(COMPANIES, null, options);
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

export const FETCH_ONE_REQUEST = 'companies/FETCH_ONE_REQUEST';
export const FETCH_ONE_SUCCESS = 'companies/FETCH_ONE_SUCCESS';
export const FETCH_ONE_ERROR = 'companies/FETCH_ONE_ERROR';
export const fetchOne = id => async dispatch => {
  dispatch({ type: FETCH_ONE_REQUEST });

  try {
    const data = await get(COMPANIES, id);
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

export const UPDATE_COMPANY_REQUEST = 'UPDATE_COMPANY_REQUEST';
export const UPDATE_COMPANY_SUCCESS = 'UPDATE_COMPANY_SUCCESS';
export const UPDATE_COMPANY_ERROR = 'UPDATE_COMPANY_ERROR';
export const update = (companyId, company) => async dispatch => {
  dispatch({ type: UPDATE_COMPANY_REQUEST });

  try {
    const data = await put(COMPANIES, companyId, company);
    dispatch({ type: UPDATE_COMPANY_SUCCESS, payload: data });
    return data;
  } catch (err) {
    let message = 'Произошла ошибка';

    if (err.response !== undefined) {
      message = err.response.data;
    }
    console.log(message);
    dispatch({ type: UPDATE_COMPANY_ERROR, payload: message });
    throw new Error(message);
  }
};

export const REMOVE_COMPANY_REQUEST = 'REMOVE_COMPANY_REQUEST';
export const REMOVE_COMPANY_SUCCESS = 'REMOVE_COMPANY_SUCCESS';
export const REMOVE_COMPANY_ERROR = 'REMOVE_COMPANY_ERROR';
export const remove = companyId => async dispatch => {
  dispatch({ type: REMOVE_COMPANY_REQUEST });

  try {
    const data = await del(COMPANIES, companyId);
    dispatch({ type: REMOVE_COMPANY_SUCCESS, payload: data });
    return data;
  } catch (err) {
    let message = 'Произошла ошибка';

    if (err.response !== undefined) {
      message = err.response.data;
    }
    console.log(message);
    dispatch({ type: REMOVE_COMPANY_ERROR, payload: message });
    throw new Error(message);
  }
};
