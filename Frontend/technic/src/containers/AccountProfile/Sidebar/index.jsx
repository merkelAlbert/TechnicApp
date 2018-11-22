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

const isSelected = (location, path) => {
  return location.pathname === path;
}

const AccountSidebar = ({ className, user, location }) => {
  return (
    <div className={cn('account-sidebar', className)}>
      <Link to={`/account/${user.id}`} className="account-sidebar__item-link">
        <div
          className={cn('account-sidebar__item', {
            'account-sidebar__item--selected': isSelected(location, `/account/${user.id}`)
          })}
        >
          <AccountCircle className="account-sidebar__item-icon" />
          {user.email}
        </div>
      </Link>
      <Link to={`/account/${user.id}/machines`} className="account-sidebar__item-link">
        <div
          className={cn('account-sidebar__item', {
            'account-sidebar__item--selected': isSelected(location, `/account/${user.id}/machines`)
          })}
        >
          <Commute className="account-sidebar__item-icon" />
          Моя техника
        </div>
      </Link>
      {/* <Link to={`/account/${user.id}/edit`} className="account-sidebar__item-link">
        <div className={cn('account-sidebar__item', {
          'account-sidebar__item--selected': isSelected(location, `/account/${user.id}/edit`)
        })}
        >
          <Edit className="account-sidebar__item-icon" />
          Изменить информацию о себе
        </div>
      </Link> */}
      {/* <Link to="/account/:userId/edit" className="account-sidebar__item-link">
        <div className={cn('account-sidebar__item', {
          'account-sidebar__item--selected': isSelected(location, `/account/${user.id}/adverts`)
        })}
        >
          <Dashboard className="account-sidebar__item-icon" />
          Мои объявления
    </div>
      </Link> */}
      <Link to={`/account/${user.id}/feedbacks`} className="account-sidebar__item-link">
        <div
          className={cn('account-sidebar__item', {
            'account-sidebar__item--selected': isSelected(location, `/account/${user.id}/feedbacks`)
          })}
        >
          <Comment className="account-sidebar__item-icon" />
          Отклики
          </div>
      </Link>
      {/* <Link to="/account/:userId/edit" className="account-sidebar__item-link">
        <div className="account-sidebar__item">
          <StarBorder className="account-sidebar__item-icon" />
          Избранное
        </div>
      </Link> */}
    </div>
  );
};

export default withRouter(AccountSidebar);