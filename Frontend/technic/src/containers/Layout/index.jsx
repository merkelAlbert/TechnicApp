import React, { Fragment } from 'react';

import Header from '../../components/Header';

const Layout = ({ children }) => (
  <Fragment>
    <Header>Курсач</Header>
    {children}
  </Fragment>
);

export default Layout;