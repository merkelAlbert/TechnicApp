import React, { Fragment } from 'react';

import './style.scss';
import Header from './Header';

const Layout = ({ children }) => (
  <Fragment>
    <Header />
    <div className="content">{children}</div>
  </Fragment>
);

export default Layout;
