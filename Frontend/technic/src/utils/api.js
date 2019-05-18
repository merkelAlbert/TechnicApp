import axios from 'axios';
import qs from 'qs';

const BASE_URL = '/api';

export const REGISTER = BASE_URL + '/account/register';
export const LOGIN = BASE_URL + '/account/login';
export const USER = BASE_URL + '/account';
export const COMPANIES = BASE_URL + '/companies';
export const MACHINES = BASE_URL + '/machines';
export const MACHINE_TYPES = BASE_URL + '/machineTypes';
export const FILES = BASE_URL + '/files';
export const ORDERS = BASE_URL + '/orders';

export const put = async (url, id, payload) => {
  let options = {};

  const token = localStorage.getItem('token');
  if (token) {
    options = {
      headers: { Authorization: `Bearer ${token}` }
    };
  }

  const { data } = await axios.put(`${url}/${id}`, payload, options);

  return data;
};

export const del = async (url, id) => {
  let options = {};

  const token = localStorage.getItem('token');
  if (token) {
    options = {
      headers: { Authorization: `Bearer ${token}` }
    };
  }

  const { data } = await axios.delete(`${url}/${id}`, options);

  return data;
};

export const post = async (url, payload) => {
  let options = {};

  const token = localStorage.getItem('token');
  if (token) {
    options = {
      headers: { Authorization: `Bearer ${token}` }
    };
  }

  const { data } = await axios.post(url, payload, options);

  return data;
};

export const get = async (url, param, params) => {
  let options = {};

  const token = localStorage.getItem('token');

  if (token) {
    options = {
      headers: { Authorization: `Bearer ${token}` },
      params,
      paramsSerializer: params => {
        return qs.stringify(params);
      }
    };
  }

  const { data } = await axios.get(`${url}/${param || ''}`, options);

  return data;
};
