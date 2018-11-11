import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../store';
import ThemeProvider from '../components/ThemeProvider';
import Layout from './Layout';
import Home from './Home';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider>
        <Layout>
          <Home />
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);

export default App;
