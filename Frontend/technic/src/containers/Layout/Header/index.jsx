import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import cn from 'classnames';
import PropTypes from 'prop-types';
import isEmpty from 'lodash-es/isEmpty';
import AccountIcon from '@material-ui/icons/AccountCircle';
import { Menu, MenuItem, IconButton } from '@material-ui/core';

import { logout } from '../../../store/actions/user';

import './style.scss';
import AppHeader from '../../../components/Header';

class Header extends Component {
  state = {
    anchorEl: null,
  }

  onAccountIconClick = (e) => {
    const { currentTarget } = e;
    this.setState({
      anchorEl: currentTarget,
    });
  }

  handleUserMenuClose = () => {
    this.setState({
      anchorEl: null,
    });
  }

  handleUserExit = () => {
    const { onExit } = this.props;
    this.handleUserMenuClose();
    onExit();
  }



  render = () => {
    const { user, className } = this.props;
    const { anchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);

    return (
      <AppHeader className={cn('header', className)} >
        <div className="header__title-container">
          <Link to="/" className="header__title">
            course
          </Link>
        </div>
        {
          (!user || isEmpty(user))
            ?
            <div className="header__auth">
              <Link to="/auth" className="header__auth-text">
                Регистрация | Вход
              </Link>
            </div>
            :
            <div className="header__auth">
              {user.email}
              <IconButton color="primary" onClick={this.onAccountIconClick}>
                <AccountIcon className="header__auth-icon" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={this.handleUserMenuClose}
              >
                <MenuItem onClick={this.handleUserMenuClose}>
                  <Link to={`/user/${user.id}`} className="header__auth-profile">
                    Личный кабинет
                </Link>
                </MenuItem>
                <MenuItem onClick={this.handleUserExit}>Выйти</MenuItem>
              </Menu>
            </div>
        }
      </AppHeader >
    )
  }
};

Header.defaultProps = {
  className: null,
}

Header.propTypes = {
  className: PropTypes.string,
}

const mapStateToProps = (state) => {
  const {
    user
  } = state;
  return { user };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { history } = ownProps;
  return ({
    onExit: () => {
      dispatch(logout());
      history.push('/');
    }
  })
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Header);