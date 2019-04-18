import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import SnackBar from '../../../components/SnackBar';
import PrivateRoute from '../../../components/PrivateRoute';

import userRoles from '../../../constants/roles';

import View from './View';
import SingleDialog from './View/SingleDialog';
import AddOrderDialog from './AddOrderDialog';

class HomeMachines extends Component {
  state = {
    open: false,
    message: null
  };

  onSuccess = message => {
    this.setState({
      open: true,
      message
    });
  };
  handleClose = () => {
    this.setState({
      open: false,
      message: null
    });
  };

  render = () => {
    const { open, message } = this.state;

    return (
      <>
        <Route
          path="/machines"
          render={() => <View onSuccess={this.onSuccess} />}
        />
        <Switch>
          <Route path="/machines/view/:machineId" component={SingleDialog} />
          <PrivateRoute
            userRole={userRoles.person.id}
            path="/machines/addorder/:machineId"
            render={() => <AddOrderDialog onSuccess={this.onSuccess} />}
          />
        </Switch>
        <SnackBar open={open} message={message} onClose={this.handleClose} />
      </>
    );
  };
}

export default HomeMachines;
