import React from 'react';

import { DialogActions as MuiDialogActions } from '@material-ui/core';

const DialogActions = ({ children, ...props }) => (
  <MuiDialogActions {...props}>{children}</MuiDialogActions>
);

export default DialogActions;
