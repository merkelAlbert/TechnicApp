import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '@material-ui/core/CircularProgress';

const style = {
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
};

const Loader = ({ isFetching, error, color, children }) => (
  <>
    {isFetching ? (
      <div style={style}>
        <Spinner color={color} />
      </div>
    ) : (
      children
    )}
    {error && <p style={{ ...style, color: 'red' }}>{error}</p>}
  </>
);

Loader.defaultProps = {
  color: 'primary'
};

Loader.propTypes = {
  color: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
};

export default Loader;
