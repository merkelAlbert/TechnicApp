import React from 'react';
import { Checkbox as MuiCheckbox, FormControlLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  formControl: {
    margin: 0
  }
});

const Checkbox = ({ label, classes, checked, ...props }) => (
  <FormControlLabel
    className={classes.formControl}
    control={<MuiCheckbox color="primary" checked={checked} {...props} />}
    label={label}
  />
);

export default withStyles(styles)(Checkbox);
