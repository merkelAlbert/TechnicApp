import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import ThemeProvider from '../Components/ThemeProvider';
import Layout from './Layout';
import Home from './Home';

const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <Layout>
        <Home />
      </Layout>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
