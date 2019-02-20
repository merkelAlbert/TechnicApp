import React from 'react';
import { Menu as MuiMenu } from '@material-ui/core';

export const MenuContext = React.createContext({});

const Menu = ({ children, onClose, ...props }) => (
  <MenuContext.Provider value={{ onClose }}>
    <MuiMenu disableAutoFocusItem {...props} onClose={onClose}>
      {children}
    </MuiMenu>
  </MenuContext.Provider>
);

export default Menu;
