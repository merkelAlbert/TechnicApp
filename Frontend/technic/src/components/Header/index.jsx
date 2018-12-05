import cn from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
  toolbar: {
    minHeight: 0,
  }
}

const Header = ({ children, classes, className, ...props }) => (
  <div className={className}>
    <AppBar position="fixed" color="secondary" {...props}>
      <Toolbar className={cn(classes.toolbar, className)}>
        {children}
      </Toolbar>
    </AppBar>
  </div>
);

Header.defaultProps = {
  className: null,
}

Header.propTypes = {
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default withStyles(styles)(Header);