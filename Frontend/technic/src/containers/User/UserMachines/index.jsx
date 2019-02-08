import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import View from './View';
import SingleDialog from './View/SingleDialog';
import AddDialog from './AddDialod';
import SnackBar from '../../../components/SnackBar';

class UserMachines extends Component {
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
        <Route path="/user/:userId/machines" component={View} />
        <Switch>
          <Route
            path="/user/:userId/machines/:machineId/view"
            component={SingleDialog}
          />
          <Route
            path="/user/:userId/machines/add"
            render={() => <AddDialog onSuccess={this.onSuccess} />}
          />
        </Switch>
        <SnackBar open={open} message={message} onClose={this.handleClose} />
      </>
    );
  };
}

export default UserMachines;
