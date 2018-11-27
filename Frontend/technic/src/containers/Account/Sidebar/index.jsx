import React from 'react';
import cn from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import {
  AccountCircle,
  Commute,
  Edit,
  Dashboard,
  Comment,
  StarBorder
} from '@material-ui/icons';

import './style.scss';
import Item from './SidebarItem';

const isSelected = (location, path) => {
  return location.pathname === path;
}

const AccountSidebar = ({ className, user, location }) => {
  return (
    <div className={cn('account-sidebar', className)}>
      <Link to={`/account/${user.id}`} className="account-sidebar__item-link">
        <Item
          icon={AccountCircle}
          caption="Мой аккаунт"
          isSelected={isSelected(location, `/account/${user.id}`)}
        />
      </Link>
      <Link to={`/account/${user.id}/machines`} className="account-sidebar__item-link">
        <Item
          icon={Commute}
          caption="Моя техника"
          isSelected={isSelected(location, `/account/${user.id}/machines`)}
        />
      </Link>
      <Link to={`/account/${user.id}/feedbacks`} className="account-sidebar__item-link">
        <Item
          icon={Comment}
          caption="Отклики"
          isSelected={isSelected(location, `/account/${user.id}/feedbacks`)}
        />
      </Link>
    </div>
  );
};

export default withRouter(AccountSidebar);