import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form as FinalForm } from 'react-final-form';
import { connect } from 'react-redux';

import { resetCommonState } from '../../store/actions/service';

class Form extends Component {
  componentWillUnmount = () => {
    const { reset } = this.props;
    reset();
  };

  render = () => {
    const { onSubmit, children, validate, error, info, ...props } = this.props;
    return (
      <FinalForm {...props} validate={validate} onSubmit={onSubmit}>
        {({ handleSubmit, className, ...formRenderProps }) => (
          <form onSubmit={handleSubmit} className={className}>
            <p
              style={{
                color: 'red',
                fontSize: '20px',
                margin: 0,
                marginTop: '10px'
              }}
            >
              {error}
            </p>
            <p
              style={{
                color: 'green',
                fontSize: '20px',
                margin: 0,
                marginTop: '10px'
              }}
            >
              {info}
            </p>
            {children(formRenderProps)}
          </form>
        )}
      </FinalForm>
    );
  };
}

Form.defaultProps = {
  error: null,
  info: null,
  validate: null
};

Form.propTypes = {
  error: PropTypes.string,
  info: PropTypes.string,
  validate: PropTypes.func,
  children: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  reset: () => dispatch(resetCommonState())
});

export default connect(
  null,
  mapDispatchToProps
)(Form);
