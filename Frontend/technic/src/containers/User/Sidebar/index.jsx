import React from 'react';
import cn from 'classnames';
import { withRouter } from 'react-router-dom';
import {
  AccountCircle,
  Commute,
  Edit,
  Dashboard,
  Comment,
  StarBorder
} from '@material-ui/icons';

import SideBar from '../../../components/SideBar';
import Link from '../../../components/Link';

import './style.scss';
import Item from './SidebarItem';

const isSelected = (location, path) => {
  return location.pathname === path;
};

const UserSideBar = ({ className, user, location }) => {
  return (
    <SideBar className={cn('user-sidebar', className)} >
      <Link to={`/user/${user.id}`}>
        <Item
          icon={AccountCircle}
          caption="Мой аккаунт"
          isSelected={isSelected(location, `/user/${user.id}`)}
        />
      </Link>
      <Link
        to={`/user/${user.id}/machines`}
      >
        <Item
          icon={Commute}
          caption="Моя техника"
          isSelected={isSelected(location, `/user/${user.id}/machines`)}
        />
      </Link>
      <Link
        to={`/user/${user.id}/feedbacks`}
      >
        <Item
          icon={Comment}
          caption="Отклики"
          isSelected={isSelected(location, `/user/${user.id}/feedbacks`)}
        />
      </Link>
    </SideBar>
  );
};

export default withRouter(UserSideBar);
