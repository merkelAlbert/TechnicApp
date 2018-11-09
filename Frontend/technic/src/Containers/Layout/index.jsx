import React, { Fragment } from 'react';

import Header from '../../Components/Header';

const Layout = ({ children }) => (
  <Fragment>
    <Header>Курсач</Header>
    {children}
  </Fragment>
);

export default Layout;