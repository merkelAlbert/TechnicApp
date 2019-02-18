import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '@material-ui/core/CircularProgress';

import { resetCommonState } from '../../store/actions/service';

const style = {
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
};

class Loader extends Component {
  componentWillUnmount = () => {
    const { reset } = this.props;
    reset();
  };

  render = () => {
    const { isFetching, error, color, children } = this.props;
    return (
      <>
        {isFetching ? (
          <div style={style}>
            <Spinner color={color} />
          </div>
        ) : error ? (
          <p style={{ ...style, color: 'red' }}>{error}</p>
        ) : (
          children
        )}
      </>
    );
  };
}

Loader.defaultProps = {
  color: 'primary'
};

Loader.propTypes = {
  color: PropTypes.string,
  isFetching: PropTypes.bool.isRequired
};

const mapDispatchToProps = dispatch => ({
  reset: () => dispatch(resetCommonState())
});

export default connect(
  null,
  mapDispatchToProps
)(Loader);
