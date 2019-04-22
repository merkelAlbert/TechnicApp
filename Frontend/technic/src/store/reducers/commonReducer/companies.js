import common from './common';
import {
  FETCH_ALL_ERROR,
  FETCH_ALL_REQUEST,
  FETCH_ALL_SUCCESS,
  FETCH_ONE_ERROR,
  FETCH_ONE_REQUEST,
  FETCH_ONE_SUCCESS,
} from '../../actions/companies';

export default common({
  request: [
    FETCH_ALL_REQUEST,
    FETCH_ONE_REQUEST,
  ],
  success: [
    FETCH_ALL_SUCCESS,
    FETCH_ONE_SUCCESS,
  ],
  error: [
    FETCH_ALL_ERROR,
    FETCH_ONE_ERROR,
  ]
});
