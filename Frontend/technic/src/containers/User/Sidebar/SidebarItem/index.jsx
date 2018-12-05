import React from 'react';
import cn from 'classnames';

import './style.scss';

const SidebarItem = ({ isSelected, icon: Icon, caption }) => (
  <div className={cn('sidebar-item', { 'sidebar-item--selected': isSelected })}>
    <Icon className="sidebar-item__icon" />
    {caption}
  </div>
);

export default SidebarItem;
