import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import SnackBar from '../../../components/SnackBar';

import View from './View';
import EditDialog from './EditDialog';

class UserInfo extends Component {
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
        <Route path="/user/:userId/info" component={View} />
        <Switch>
         
           <Route
            path="/user/:userId/info/edit"
            render={() => <EditDialog onSuccess={this.onSuccess} />}
          />
          
        </Switch>
        <SnackBar open={open} message={message} onClose={this.handleClose} />
      </>
    );
  };
}

export default UserInfo;
