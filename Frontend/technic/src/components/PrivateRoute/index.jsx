import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';

export const PrivateRoute = ({
  component: Component,
  render,
  userRole,
  ...props
}) => (
  <Route
    {...props}
    render={renderProps => {
      if (localStorage.getItem('token')) {
        if (userRole) {
          if (userRole === +localStorage.getItem('role')) {
            if (render) {
              render();
            } else return <Component {...renderProps} />;
          } else return <Redirect to="/" />;
        } else {
          if (render) {
            render();
          } else return <Component {...renderProps} />;
        }
      } else return <Redirect to="/auth" />;
    }}
  />
);

export default withRouter(PrivateRoute);
