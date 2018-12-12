import common from './common';
import {
  FETCH_ALL_REQUEST,
  FETCH_ALL_SUCCESS,
  FETCH_ALL_ERROR,
} from '../../actions/machineTypes';

export default common({
  request: [FETCH_ALL_REQUEST],
  success: [FETCH_ALL_SUCCESS],
  error: [FETCH_ALL_ERROR],
  name: 'machineTypes',
});
