import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import View from './View';
import SingleDialog from './View/SingleDialog';

class HomeMachines extends Component {
  render = () => {
    return (
      <>
        <Route exact path="/machines" component={View} />
        <Switch>
          <Route
            path="/machines/view/:machineId"
            component={SingleDialog}
          />
        </Switch>
      </>
    );
  };
}

export default HomeMachines;
