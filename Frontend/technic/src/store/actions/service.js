export const RESET_COMMON_STATE = 'RESET_COMMON_STATE';
export const resetCommonState = () => dispatch => {
  dispatch({ type: RESET_COMMON_STATE });
};

export const USER_LOGOUT = 'USER_LOGOUT';
export const logout = () => dispatch => {
  localStorage.clear();
  dispatch({ type: USER_LOGOUT });
};
