import React from 'react';
import { Route } from 'react-router-dom';

import View from './View';

const HomeCompanies = () => <Route path="/companies" component={View} />;

export default HomeCompanies;
