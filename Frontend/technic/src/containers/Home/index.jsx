import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './style.scss';
import Machines from './Machines';

const Home = () => (
  <Switch>
    <Route path="/machines" component={Machines} />
  </Switch>
);

export default Home;