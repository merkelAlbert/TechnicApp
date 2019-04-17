import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from '../../components/PrivateRoute';

import './style.scss';
import UserInfo from './Info';
import Sidebar from './Sidebar';
import UserMachines from './Machines';
import Favorites from './Favorites';
import UserOrders from './Orders';

import userRoles from '../../constants/roles';

class User extends Component {
  render = () => (
    <>
      <Sidebar className="user-profile__sidebar" />
      <div className="user-profile__main">
        <Switch>
          <Route path="/user/:userId/info" component={UserInfo} />
          <PrivateRoute
            userRole={userRoles.company.id}
            path="/user/:userId/machines"
            component={UserMachines}
          />
          <PrivateRoute
            userRole={userRoles.person.id}
            path="/user/:userId/favoritemachines"
            component={Favorites}
          />
          <Route path="/user/:userId/orders" component={UserOrders} />
        </Switch>
      </div>
    </>
  );
}

export default User;
