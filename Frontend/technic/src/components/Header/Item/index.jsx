import cn from 'classnames';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 10px',
    minWidth: '100px',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      cursor: 'pointer',
      color: 'white'
    }
  }
});

const HeaderItem = ({ classes, className, children }) => (
  <div className={cn(classes.root, className)}>{children}</div>
);

export default withStyles(styles)(HeaderItem);
