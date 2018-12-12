import common from './common';
import {
  ADD_MACHINE_ERROR,
  ADD_MACHINE_REQUEST,
  ADD_MACHINE_SUCCESS
} from '../../actions/machines';

export default common({
  request: [ADD_MACHINE_REQUEST],
  success: [ADD_MACHINE_SUCCESS],
  error: [ADD_MACHINE_ERROR],
  name: 'machines',
});
