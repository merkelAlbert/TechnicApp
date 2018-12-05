import React from 'react';
import { Route, Switch } from 'react-router-dom';

import View from './View';
import AddDialog from './AddDialod';

const UserMachines = () => (
  <>
    <Switch>
      <Route path="/user/:userId/machines" component={View} />
    </Switch>
    <Route path="/user/:userId/machines/add" component={AddDialog} />
  </>
);

export default UserMachines;
