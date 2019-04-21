import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './style.scss';
import Machines from './Machines';
import Companies from './Companies';

const Home = () => (
  <Switch>
    <Route path="/machines" component={Machines} />
    <Route path="/companies" component={Companies} />
  </Switch>
);

export default Home;