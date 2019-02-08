import axios from 'axios';

const BASE_URL = 'http://localhost:5000/';

export const REGISTER = BASE_URL + 'account/register/';
export const LOGIN = BASE_URL + 'account/login/';
export const USER_INFO = BASE_URL + 'user/';
export const MACHINES = BASE_URL + 'machines/';
export const FETCH_MACHINE_TYPES = BASE_URL + 'machineTypes/';

export const post = async (url, payload) => {
  let options = {};

  const token = localStorage.getItem('token');
  if (token) {
    options = {
      headers: { Authorization: `Bearer ${token}` }
    }
  }

  const { data } = await axios.post(url, payload, options);

  return data;
}

export const get = async (url, param, params) => {
  let options = {};

  const token = localStorage.getItem('token');

  if (token) {
    options = {
      headers: { Authorization: `Bearer ${token}` },
      params,
    }
  }

  const { data } = await axios.get(url + (param || ''), options);

  return data;
}