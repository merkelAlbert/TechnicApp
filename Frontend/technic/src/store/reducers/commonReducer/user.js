import common from './common';
import {
  FETCH_ONE_REQUEST,
  USER_AUTH_REQUEST,
  FETCH_ONE_SUCCESS,
  USER_AUTH_SUCCESS,
  FETCH_ONE_ERROR,
  USER_AUTH_ERROR,
} from '../../actions/user';

export default common({
  request: [FETCH_ONE_REQUEST, USER_AUTH_REQUEST],
  success: [FETCH_ONE_SUCCESS, USER_AUTH_SUCCESS],
  error: [FETCH_ONE_ERROR, USER_AUTH_ERROR],
});
