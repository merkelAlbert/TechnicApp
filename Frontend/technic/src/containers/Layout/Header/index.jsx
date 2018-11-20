import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import PropTypes from 'prop-types';
import isEmpty from 'lodash-es/isEmpty';
import AccountIcon from '@material-ui/icons/AccountCircle';

import './style.scss';
import AppHeader from '../../../components/Header';

const Header = ({ className, user }) => (
  <AppHeader className={cn('header', className)}>
    <div className="header__title">
      course
    </div>
    {
      (user === null || user === undefined || isEmpty(user))
        ? <div className="header__auth" >
          <Link to={'/auth'}>
            <AccountIcon color="secondary" className="header__auth-icon" />
          </Link>
        </div>
        : <div className="header__auth">
          {user.email}
        </div>
    }
  </AppHeader>
);

Header.defaultProps = {
  className: null,
}

Header.propTypes = {
  className: PropTypes.string,
}

const mapStateToProps = (state) => {
  const {
    account: {
      user,
    }
  } = state;
  console.log(state);
  return { user };
};

export default connect(mapStateToProps, null)(Header);