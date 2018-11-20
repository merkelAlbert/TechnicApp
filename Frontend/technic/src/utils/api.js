import axios from 'axios';

const BASE_URL = 'http://localhost:5000/';

export const REGISTER = BASE_URL + 'account/register/';
export const LOGIN = BASE_URL + 'account/login/';

export const post = async (url, payload) => {
  const { data } = await axios.post(url, payload);
  return data;
}