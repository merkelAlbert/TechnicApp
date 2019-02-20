import React from 'react';
import { MenuItem as MuiMenuItem } from '@material-ui/core';

import { MenuContext } from '../../Menu';

const MenuItem = ({ children, onClick, ...props }) => (
  <MenuContext.Consumer>
    {({ onClose }) => (
      <MuiMenuItem {...props} onClick={()=>{
        onClick && onClick();
        onClose();
      }}>
        {children}
      </MuiMenuItem>
    )}
  </MenuContext.Consumer>
);

export default MenuItem;
