import cn from 'classnames';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
  }
});

const Sidebar = ({ className, classes, children }) => (
  <div className={cn(classes.root, className)}>{children}</div>
);

export default withStyles(styles)(Sidebar);
