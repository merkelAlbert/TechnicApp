import common from './common';
import {
  ADD_FILES_ERROR,
  ADD_FILES_REQUEST,
  ADD_FILES_SUCCESS
} from '../../actions/files';

export default common({
  request: [ADD_FILES_REQUEST],
  success: [ADD_FILES_SUCCESS],
  error: [ADD_FILES_ERROR]
});
