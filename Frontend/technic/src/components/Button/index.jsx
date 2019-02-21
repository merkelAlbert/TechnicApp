import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

const ContainedButton = ({
  children,
  type,
  classes,
  color,
  disabled,
  ...props
}) => {
  return (
    <Button
      {...props}
      type={type}
      disabled={disabled}
      color={color}
      variant="contained"
      className={classes.button}
    >
      {children}
    </Button>
  );
};

ContainedButton.defaultProps = {
  type: 'button',
  color: 'primary',
  disabled: false
};

ContainedButton.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export default withStyles(styles)(ContainedButton);
