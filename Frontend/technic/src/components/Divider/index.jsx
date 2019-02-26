import cn from 'classnames';
import React from 'react';
import { Divider as MuiDivider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  }
});

const Divider = ({ classes, className, variant, ...props }) => (
  <MuiDivider
    variant={variant}
    className={cn(classes.root, className)}
    {...props}
  />
);

export default withStyles(styles)(Divider);
