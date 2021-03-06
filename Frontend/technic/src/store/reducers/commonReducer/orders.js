import common from './common';
import {
  FETCH_ALL_ERROR,
  FETCH_ALL_REQUEST,
  FETCH_ALL_SUCCESS,
  FETCH_ONE_ERROR,
  FETCH_ONE_REQUEST,
  FETCH_ONE_SUCCESS,
  ADD_ORDER_ERROR,
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  UPDATE_ORDER_ERROR,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  REMOVE_ORDER_ERROR,
  REMOVE_ORDER_REQUEST,
  REMOVE_ORDER_SUCCESS
} from '../../actions/orders';

export default common({
  request: [
    ADD_ORDER_REQUEST,
    FETCH_ALL_REQUEST,
    FETCH_ONE_REQUEST,
    UPDATE_ORDER_REQUEST,
    REMOVE_ORDER_REQUEST
  ],
  success: [
    ADD_ORDER_SUCCESS,
    FETCH_ALL_SUCCESS,
    FETCH_ONE_SUCCESS,
    UPDATE_ORDER_SUCCESS,
    REMOVE_ORDER_SUCCESS
  ],
  error: [
    ADD_ORDER_ERROR,
    FETCH_ALL_ERROR,
    FETCH_ONE_ERROR,
    UPDATE_ORDER_ERROR,
    REMOVE_ORDER_ERROR
  ]
});
