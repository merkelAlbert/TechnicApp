import React from 'react';
import MuiCardContent from '@material-ui/core/CardContent';

const CardContent = ({ className, children }) => {
  return <MuiCardContent className={className}>{children}</MuiCardContent>;
};

export default CardContent;
