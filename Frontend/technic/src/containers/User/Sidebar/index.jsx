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
};

const UserSidebar = ({ className, user, location }) => {
  return (
    <div className={cn('user-sidebar', className)}>
      <Link to={`/user/${user.id}`} className="user-sidebar__item-link">
        <Item
          icon={AccountCircle}
          caption="Мой аккаунт"
          isSelected={isSelected(location, `/user/${user.id}`)}
        />
      </Link>
      <Link
        to={`/user/${user.id}/machines`}
        className="user-sidebar__item-link"
      >
        <Item
          icon={Commute}
          caption="Моя техника"
          isSelected={isSelected(location, `/user/${user.id}/machines`)}
        />
      </Link>
      <Link
        to={`/user/${user.id}/feedbacks`}
        className="user-sidebar__item-link"
      >
        <Item
          icon={Comment}
          caption="Отклики"
          isSelected={isSelected(location, `/user/${user.id}/feedbacks`)}
        />
      </Link>
    </div>
  );
};

export default withRouter(UserSidebar);
