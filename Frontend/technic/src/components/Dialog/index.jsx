import React from 'react';

import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { Cancel } from '@material-ui/icons';

const styles = {
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
};

const Actions = ({ children }) => (
  <DialogActions>
    {children}
  </DialogActions>
);

const Dialog = ({ children, open, onClose, title, classes, ...props }) => (
  <MuiDialog {...props} onClose={onClose} open={open} disableBackdropClick>
    <DialogTitle className={classes.title} disableTypography>
      {title}
      <IconButton onClick={onClose}>
        <Cancel />
      </IconButton>
    </DialogTitle>
    <DialogContent>
      {children}
    </DialogContent>
  </MuiDialog>
);

Dialog.Actions = Actions;

export default withStyles(styles)(Dialog);
