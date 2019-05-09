import cn from 'classnames';
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
  className,
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
      className={cn( classes.button, className)}
    >
      {children}
    </Button>
  );
};

ContainedButton.defaultProps = {
  type: 'button',
  color: 'primary',
  disabled: false,
  className: null
};

ContainedButton.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export default withStyles(styles)(ContainedButton);
