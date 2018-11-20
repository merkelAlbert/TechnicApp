import axios from 'axios';

const BASE_URL = 'http://localhost:5000/';

export const REGISTER = BASE_URL + 'account/register/';
export const LOGIN = BASE_URL + 'account/login/';
export const USER_INFO = BASE_URL + 'account/';

export const post = async (url, payload, auth) => {
  let options = {};
  if (auth) {
    options = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }
  }

  const { data } = await axios.post(url, payload, options);
  return data;
}

export const get = async (url, params, auth) => {
  let options = {};

  if (auth) {
    options = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }
  }
  const { data } = await axios.get(url + params, options);
  return data;
}