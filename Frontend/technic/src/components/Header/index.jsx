import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Header = ({ children, className, ...props }) => (
  <div className={className}>
    <AppBar position="fixed" color="primary" {...props}>
      <Toolbar>
        <Typography variant="h6" color="inherit">
          {children}
        </Typography>
      </Toolbar>
    </AppBar>
  </div>
);

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;