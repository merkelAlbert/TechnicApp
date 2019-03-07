import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from '../../components/PrivateRoute';

import './style.scss';
import UserInfo from './UserInfo';
import Sidebar from './Sidebar';
import UserMachines from './UserMachines';
import UserFeedbacks from './UserFeedbacks';

import userRoles from '../../constants/roles';

class User extends Component {
  render = () => {
    const {
      match: {
        params: { userId }
      }
    } = this.props;

    return (
      <>
        <Sidebar className="user-profile__sidebar" userId={userId} />
        <div className="user-profile__main">
          <Switch>
            <Route path="/user/:userId/info" component={UserInfo} />
            <PrivateRoute
              userRole={userRoles.company.id}
              path="/user/:userId/machines"
              component={UserMachines}
            />
            <Route path="/user/:userId/feedbacks" component={UserFeedbacks} />
          </Switch>
        </div>
      </>
    );
  };
}

export default User;
