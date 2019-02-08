import React from 'react';
import MuiIconButton from '@material-ui/core/IconButton';
const IconButton = ({ color, children, onClick }) => {
  return (
    <MuiIconButton color={color} onClick={onClick}>
      {children}
    </MuiIconButton>
  );
};

export default IconButton;
