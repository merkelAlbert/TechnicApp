import cn from 'classnames';
import React from 'react';
import MuiCardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';

import IconButton from '../../IconButton';

const styles = {
  root: {
    display: 'block',
  },
  title: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '18px',
  },
  subHeader: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '14px',
    marginTop: '5px',
    color: 'grey',
  }
};

const CardHeader = ({ classes, title, subTitle, className, onActionClick }) => {
  return (
    <MuiCardHeader
      disableTypography
      title={<div className={classes.title}>{title}</div>}
      subheader={<div className={classes.subHeader}>{subTitle}</div>}
      className={cn(classes.root, className)}
      action={
        onActionClick && (
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        )
      }
    />
  );
};

export default withStyles(styles)(CardHeader);
