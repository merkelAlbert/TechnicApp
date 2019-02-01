import React from 'react';
import MuiCardActions from '@material-ui/core/CardActions';

const CardActions = ({ className, children }) => {
  return <MuiCardActions className={className}>{children}</MuiCardActions>;
};

export default CardActions;
