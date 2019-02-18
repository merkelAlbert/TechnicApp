import cn from 'classnames';
import React from 'react';
import MuiCardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  content: {
    padding: '16px',
    '&:last-child': {
      padding: '16px'
    }
  }
};

const CardContent = ({ classes, className, children }) => {
  return (
    <MuiCardContent className={cn(classes.content, className)}>
      {children}
    </MuiCardContent>
  );
};

export default withStyles(styles)(CardContent);
