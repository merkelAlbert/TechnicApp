import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({
  component: Component,
  render,
  isAuth,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('token') ? (
        render ? (
          render()
        ) : (
          <Component {...props} />
        )
      ) : (
        <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />
      )
    }
  />
);

export default PrivateRoute;
