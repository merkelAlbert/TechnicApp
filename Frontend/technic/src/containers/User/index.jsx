import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter, Switch, Route } from 'react-router-dom';

import './style.scss';
import EditUser from './EditUser';
import UserInfo from './UserInfo';
import Sidebar from './Sidebar';
import UserMachines from './UserMachines';
import UserFeedbacks from './UserFeedbacks';

import { getUserInfo } from '../../store/actions/user';

class User extends Component {

  componentDidMount = () => {
    const {
      match: {
        params: {
          userId
        }
      },
      loadData,
    } = this.props;

    loadData(userId);
  }

  render = () => {
    const { user } = this.props;

    return (
      <>
        <Sidebar className="user-profile__sidebar" user={user} />
        <div className="user-profile__main">
          <Switch>
            <Route exact path="/user/:userId" component={UserInfo} />
            <Route path="/user/:userId/edit" component={EditUser} />
            <Route path="/user/:userId/machines" component={UserMachines} />
            <Route path="/user/:userId/feedbacks" component={UserFeedbacks} />
          </Switch>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  loadData: async (userId) => {
    try {
      await dispatch(getUserInfo(userId));
    }
    catch (err) {
      alert(err);
    }
  }
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(User);