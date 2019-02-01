import React from 'react';
import MuiCard from '@material-ui/core/Card';

const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
};

const Card = ({ className, children }) => {
  return (
    <MuiCard className={className} style={style}>
      {children}
    </MuiCard>
  );
};

export default Card;
