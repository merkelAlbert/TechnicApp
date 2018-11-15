import React, { Fragment } from 'react';

import './style.scss';
import Header from '../../components/Header';

const Layout = ({ children }) => (
  <Fragment>
    <Header className="header">Курсач</Header>
    {children}
  </Fragment>
);

export default Layout;