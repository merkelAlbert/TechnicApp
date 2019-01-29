import common from './common';
import {
  FETCH_ALL_ERROR,
  FETCH_ALL_REQUEST, 
  FETCH_ALL_SUCCESS,
  ADD_MACHINE_ERROR,
  ADD_MACHINE_REQUEST,
  ADD_MACHINE_SUCCESS
} from '../../actions/machines';

export default common({
  request: [ADD_MACHINE_REQUEST, FETCH_ALL_REQUEST],
  success: [ADD_MACHINE_SUCCESS, FETCH_ALL_SUCCESS],
  error: [ADD_MACHINE_ERROR, FETCH_ALL_ERROR],
  name: 'machines',
});
