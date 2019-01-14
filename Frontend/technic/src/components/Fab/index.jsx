import cn from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MuiFab from '@material-ui/core/Fab';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

const Fab = ({ children, type, className, classes, color, ...props }) => {
  return (
    <MuiFab
      {...props}
      type={type}
      color={color}
      className={cn(classes.button, className)}
    >
      {children}
    </MuiFab>
  );
};

Fab.defaultProps = {
  type: 'button',
  color: 'primary'
};

Fab.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default withStyles(styles)(Fab);
