import common from './common';
import {
  FETCH_USER_INFO_REQUEST,
  USER_AUTH_REQUEST,
  FETCH_USER_INFO_SUCCESS,
  USER_AUTH_SUCCESS,
  FETCH_USER_INFO_ERROR,
  USER_AUTH_ERROR,
  USER_AUTH_FORM_RESET,
} from '../../actions/user';

export default common({
  request: [FETCH_USER_INFO_REQUEST, USER_AUTH_REQUEST],
  success: [FETCH_USER_INFO_SUCCESS, USER_AUTH_SUCCESS],
  error: [FETCH_USER_INFO_ERROR, USER_AUTH_ERROR],
  reset: [USER_AUTH_FORM_RESET],
  name: 'user',
});
