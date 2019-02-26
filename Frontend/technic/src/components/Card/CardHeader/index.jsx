import cn from 'classnames';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';

import IconButton from '../../IconButton';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing.unit * 2
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '70%'
  },
  title: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  subHeader: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '14px',
    marginTop: '5px',
    color: 'grey'
  },
  action: {},
  large: {
    fontSize: '22px'
  },
  medium: {
    fontSize: '18px'
  },
  small: {
    fontSize: '14px'
  }
});

const CardHeader = ({
  classes,
  title,
  subTitle,
  titleSize,
  className,
  onActionClick
}) => {
  return (
    <div className={cn(classes.root, className)}>
      <div className={classes.container}>
        <div
          className={cn(
            {
              [classes.large]: titleSize === 'large',
              [classes.medium]: titleSize === 'medium',
              [classes.small]: titleSize === 'small'
            },
            classes.title
          )}
        >
          {title}
        </div>
        {subTitle && <div className={classes.subHeader}>{subTitle}</div>}
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
