import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loader from '../../../../components/Loader';
import Card from '../../../../components/Card';
import CardContent from '../../../../components/Card/CardContent';
import CardHeader from '../../../../components/Card/CardHeader';
import Divider from '../../../../components/Divider';
import Link from '../../../../components/Link';
import Menu from '../../../../components/Menu';
import MenuItem from '../../../../components/Menu/MenuItem';

import { fetchOne } from '../../../../store/actions/user';

import './style.scss';
import UserCardRow from './UserCardRow';

class UserInfoView extends Component {
  state = {
    anchorEl: null
  };
  componentDidMount = () => {
    const { loadData } = this.props;
    loadData();
  };

  onCardActionClick = e => {
    const { currentTarget } = e;
    this.setState({
      anchorEl: currentTarget
    });
  };

  handleCardMenuClose = () => {
    this.setState({
      anchorEl: null
    });
  };
  render = () => {
    const {
      user,
      isFetching,
      error,
      match: {
        params: { userId }
      }
    } = this.props;
    const { anchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);

    return (
      <>
        <Loader isFetching={isFetching} error={error}>
          <Card className="user-info-view__card">
            <CardHeader
              title="Профиль"
              titleSize="large"
              onActionClick={this.onCardActionClick}
            />
            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={this.handleCardMenuClose}
            >
              <Link to={`/user/${userId}/info/edit`}>
                <MenuItem>Изменить</MenuItem>
              </Link>
            </Menu>
            <CardContent>
              <div className="user-info-view__table">
                <UserCardRow title="Email" value={user.email} />
                <Divider />
                <UserCardRow title="Название" value={user.name} />
                <Divider />
                <UserCardRow title="Телефон" value={user.phone} />
                <Divider />
                <UserCardRow title="Описание" value={user.description} />
                <Divider />
                <UserCardRow title="Адрес" value={user.address} />
                <Divider />
                <UserCardRow
                  title="Дата регистрации"
                  value={new Date(user.registrationDate).toLocaleDateString('ru')}
                />
              </div>
            </CardContent>
          </Card>
        </Loader>
      </>
    );
  };
}

const mapStateToProps = state => ({
  user: state.user,
  isFetching: state.common.user.isFetching,
  error: state.common.user.error
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    match: {
      params: { userId }
    }
  } = ownProps;
  return {
    loadData: async () => {
      try {
        await dispatch(fetchOne(userId));
      } catch (err) {
        console.log(err);
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfoView);
