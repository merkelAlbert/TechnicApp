import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import PrivateRoute from '../components/PrivateRoute';

import './style.scss';
import { store, persistor } from '../store';
import ThemeProvider from '../components/ThemeProvider';
import Layout from './Layout';
import Home from './Home';
import Authorization from './Authorization';
import User from './User';

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <ThemeProvider>
          <Switch>
            <Layout>
              <Route path="/auth" component={Authorization} />
              <Route exact path="/" component={Home} />
              <PrivateRoute path="/user/:userId" component={User} />
            </Layout>
          </Switch>
        </ThemeProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

export default App;
