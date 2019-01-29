import cn from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import MuiSnackBar from '@material-ui/core/Snackbar';
import SnackbarContent from './SnackBarContent';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
});

const SnackBar = ({ className, classes, variant, open, onClose, message }) => (
  <MuiSnackBar
    className={cn(classes.margin, className)}
    open={open}
    autoHideDuration={3000}
    onClose={onClose}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
  >
    <SnackbarContent message={message} variant={variant} onClose={onClose} />
  </MuiSnackBar>
);

SnackBar.defaultProps = {
  className: null,
  variant: 'success',
  message: null,
  open: false
};

SnackBar.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
  open: PropTypes.bool.isRequired
};

export default withStyles(styles)(SnackBar);
export const SnackBarContext = React.createContext();
