import React from 'react';
import MuiIconButton from '@material-ui/core/IconButton';

const IconButton = ({ color, className, children, onClick, disabled }) => {
  return (
    <MuiIconButton
      disabled={disabled}
      className={className}
      color={color}
      onClick={onClick}
    >
      {children}
    </MuiIconButton>
  );
};

export default IconButton;
