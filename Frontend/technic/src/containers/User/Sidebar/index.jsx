import React from 'react';
import cn from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AccountCircle, Commute, Assignment, Star } from '@material-ui/icons';

import SideBar from '../../../components/SideBar';
import Link from '../../../components/Link';

import userRoles from '../../../constants/roles';

import './style.scss';
import Item from './SidebarItem';

const UserSideBar = ({ className, user, location }) => (
  <SideBar className={cn('user-sidebar', className)}>
    <Link to={`/user/${user.id}/info`}>
      <Item
        icon={AccountCircle}
        caption="Мой аккаунт"
        isSelected={location.pathname === `/user/${user.id}/info`}
      />
    </Link>
    {user.role === userRoles.company.id && (
      <Link to={`/user/${user.id}/machines`}>
        <Item
          icon={Commute}
          caption="Моя техника"
          isSelected={location.pathname === `/user/${user.id}/machines`}
        />
      </Link>
    )}
    {user.role === userRoles.person.id && (
      <Link to={`/user/${user.id}/favoritemachines`}>
        <Item
          icon={Star}
          caption="Избранное"
          isSelected={location.pathname === `/user/${user.id}/favoritemachines`}
        />
      </Link>
    )}
    <Link to={`/user/${user.id}/orders`}>
      <Item
        icon={Assignment}
        caption="Заказы"
        isSelected={location.pathname === `/user/${user.id}/orders`}
      />
    </Link>
  </SideBar>
);

const mapStateToProps = state => ({
  user: state.user
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    null
  )
)(UserSideBar);
