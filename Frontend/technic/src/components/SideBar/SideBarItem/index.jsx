import cn from 'classnames';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  default: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.light
    }
  },
  selected: {
    backgroundColor: theme.palette.primary.light
  }
});

const SidebarItem = ({ isSelected, classes, className, children }) => (
  <div
    className={cn(
      classes.default,
      { [classes.selected]: isSelected },
      className
    )}
  >
    {children}
  </div>
);

export default withStyles(styles)(SidebarItem);
