import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '@material-ui/core/CircularProgress';

const style = {
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
};

const Loader = ({ isFetching, color, children }) => (
  <>
    {isFetching ? (
      <div style={style}>
        <Spinner color={color} />
      </div>
    ) : (
      children
    )}
  </>
);

Loader.defaultProps = {
  color: 'primary'
};

Loader.propTypes = {
  color: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

export default Loader;
