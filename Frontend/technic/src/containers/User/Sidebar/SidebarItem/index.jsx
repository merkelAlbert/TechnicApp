import React from 'react';
import cn from 'classnames';

import Item from '../../../../components/SideBar/SideBarItem';

import './style.scss';

const SidebarItem = ({ isSelected, icon: Icon, caption }) => (
  <Item className="sidebar-item" isSelected={isSelected}>
    <Icon className="sidebar-item__icon" />
    {caption}
  </Item>
);

export default SidebarItem;
