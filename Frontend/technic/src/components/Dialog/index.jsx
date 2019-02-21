import React from 'react';

import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { Cancel } from '@material-ui/icons';

const styles = {
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '18px'
  }
};

const Dialog = ({ children, open, onClose, title, classes, ...props }) => (
  <MuiDialog
    {...props}
    onClose={onClose}
    open={open}
    disableBackdropClick
    // scroll="paper"
  >
    <DialogTitle className={classes.title} disableTypography>
      {title}
      <IconButton onClick={onClose}>
        <Cancel />
      </IconButton>
    </DialogTitle>
    <DialogContent>{children}</DialogContent>
  </MuiDialog>
);

export default withStyles(styles)(Dialog);
