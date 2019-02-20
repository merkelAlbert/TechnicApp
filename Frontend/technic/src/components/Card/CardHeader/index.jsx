import cn from 'classnames';
import React from 'react';
import MuiCardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';

import IconButton from '../../IconButton';
import { CardContent } from '@material-ui/core';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px'
  },
  container: {
    width: '70%'
  },
  title: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '18px'
  },
  subHeader: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '14px',
    marginTop: '5px',
    color: 'grey'
  },
  action: {
  }
};

const CardHeader = ({ classes, title, subTitle, className, onActionClick }) => {
  return (
    <div className={cn(classes.root, className)}>
      <div className={classes.container}>
        <div className={classes.title}>{title}</div>
        <div className={classes.subHeader}>{subTitle}</div>
      </div>
      {onActionClick && (
        <IconButton className={classes.action} onClick={onActionClick}>
          <MoreVertIcon />
        </IconButton>
      )}
    </div>
  );
};

export default withStyles(styles)(CardHeader);
