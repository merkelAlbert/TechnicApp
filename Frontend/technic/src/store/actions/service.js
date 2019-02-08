export const RESET_COMMON_STATE = 'RESET_COMMON_STATE';
export const resetCommonState = () => dispatch => {
  dispatch({ type: RESET_COMMON_STATE });
};
