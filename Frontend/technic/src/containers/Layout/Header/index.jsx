import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import cn from 'classnames';
import PropTypes from 'prop-types';
import isEmpty from 'lodash-es/isEmpty';
import AccountIcon from '@material-ui/icons/AccountCircle';

import { logout } from '../../../store/actions/service';

import AppHeader from '../../../components/Header';
import HeaderItem from '../../../components/Header/Item';
import Link from '../../../components/Link';
import IconButton from '../../../components/IconButton';
import Menu from '../../../components/Menu';
import MenuItem from '../../../components/Menu/MenuItem';

import './style.scss';

class Header extends Component {
  state = {
    anchorEl: null
  };

  onAccountIconClick = e => {
    const { currentTarget } = e;
    this.setState({
      anchorEl: currentTarget
    });
  };

  handleUserMenuClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  handleUserExit = () => {
    const { onExit } = this.props;
    this.handleUserMenuClose();
    onExit();
  };

  render = () => {
    const { user, className } = this.props;
    const { anchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);

    return (
      <AppHeader className={cn('header', className)}>
        <div className="header__title-container">
          <Link to="/">course</Link>
        </div>
        <Link to="/machines" className="header__item">
          <HeaderItem>Техника</HeaderItem>
        </Link>
        <Link to="/companies" className="header__item">
          <HeaderItem>Компании</HeaderItem>
        </Link>
        <HeaderItem>О нас</HeaderItem>

        {!user || isEmpty(user) ? (
          <div className="header__auth">
            <Link to="/auth">Регистрация | Вход</Link>
          </div>
        ) : (
          <div className="header__auth">
            {user.name}
            <IconButton color="primary" onClick={this.onAccountIconClick}>
              <AccountIcon className="header__auth-icon" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={this.handleUserMenuClose}
            >
              <Link
                to={`/user/${user.id}/info`}
                className="header__auth-profile"
              >
                <MenuItem>Личный кабинет</MenuItem>
              </Link>
              <MenuItem onClick={this.handleUserExit}>Выйти</MenuItem>
            </Menu>
          </div>
        )}
      </AppHeader>
    );
  };
}

Header.defaultProps = {
  className: null
};

Header.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = state => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { history } = ownProps;
  return {
    onExit: () => {
      dispatch(logout());
      history.push('/');
    }
  };
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Header);
