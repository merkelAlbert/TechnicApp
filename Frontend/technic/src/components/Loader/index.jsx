import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '@material-ui/core/CircularProgress';

const Loader = ({ isFetching, color, children }) => (
  <>
    {isFetching ? <Spinner color={color} /> : children}
  </>
);

Loader.defaultProps = {
  color: 'secondary',
};

Loader.propTypes = {
  color: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}

export default Loader;
