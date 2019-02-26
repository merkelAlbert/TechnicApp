import React from 'react';
import cn from 'classnames';
import { withRouter } from 'react-router-dom';
import { AccountCircle, Commute, Comment } from '@material-ui/icons';

import SideBar from '../../../components/SideBar';
import Link from '../../../components/Link';

import './style.scss';
import Item from './SidebarItem';

const isSelected = (location, path) => {
  return location.pathname === path;
};

const UserSideBar = ({ className, userId, location }) => {
  return (
    <SideBar className={cn('user-sidebar', className)}>
      <Link to={`/user/${userId}/info`}>
        <Item
          icon={AccountCircle}
          caption="Мой аккаунт"
          isSelected={isSelected(location, `/user/${userId}/info`)}
        />
      </Link>
      <Link to={`/user/${userId}/machines`}>
        <Item
          icon={Commute}
          caption="Моя техника"
          isSelected={isSelected(location, `/user/${userId}/machines`)}
        />
      </Link>
      <Link to={`/user/${userId}/feedbacks`}>
        <Item
          icon={Comment}
          caption="Отклики"
          isSelected={isSelected(location, `/user/${userId}/feedbacks`)}
        />
      </Link>
    </SideBar>
  );
};

export default withRouter(UserSideBar);
