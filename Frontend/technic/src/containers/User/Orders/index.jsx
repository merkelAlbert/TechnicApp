import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import SnackBar from '../../../components/SnackBar';

import View from './View';
import SingleDialog from './View/SingleDialog';
import EditDialog from './EditDialog';
import RemoveDialog from './RemoveDialog';

class UserOrders extends Component {
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
        <Route path="/user/:userId/orders" component={View} />
        <Switch>
          {/* <Route
            path="/user/:userId/orders/view/:orderId"
            component={SingleDialog}
          /> */}
          <Route
            path="/user/:userId/orders/edit/:orderId"
            render={() => <EditDialog onSuccess={this.onSuccess} />}
          />
          <Route
            path="/user/:userId/orders/remove/:orderId"
            render={() => <RemoveDialog onSuccess={this.onSuccess} />}
          />
        </Switch>
        <SnackBar open={open} message={message} onClose={this.handleClose} />
      </>
    );
  };
}

export default UserOrders;
