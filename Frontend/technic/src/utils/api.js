import axios from 'axios';

const BASE_URL = 'http://localhost:5000/';

export const REGISTER = BASE_URL + 'account/register/';
export const LOGIN = BASE_URL + 'account/login/';

export const post = async (url, data) => {
  const response = await axios.post(url, data);
  return response;
}