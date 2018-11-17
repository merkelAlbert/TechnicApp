import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../store';
import ThemeProvider from '../components/ThemeProvider';
import Layout from './Layout';
import Home from './Home';
import Authorization from './Authorization';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider>
        <Layout>
          <Route exact path='/' component={Home} />
          <Route exact path='/auth' component={Authorization} />
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);

export default App;
