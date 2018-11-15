import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const ContainedButton = ({ children, type, classes, ...props }) => {
  return (
    <Button {...props} type={type} variant="contained" className={classes.button}>{children}</Button>
  );
}

export default withStyles(styles)(ContainedButton);