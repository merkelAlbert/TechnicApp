import React from 'react';
import PropTypes from 'prop-types';
import { Form as FinalForm } from 'react-final-form';

const Form = ({
  onSubmit,
  children,
  validate,
  error,
  info,
  ...props
}) => (
  <FinalForm {...props} validate={validate} onSubmit={onSubmit}>
    {({ handleSubmit, className }) => (
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
        {children(props)}
      </form>
    )}
  </FinalForm>
);

Form.defaultProps = {
  error: null,
  info: null,
  validate: null,
};

Form.propTypes = {
  error: PropTypes.string,
  info: PropTypes.string,
  validate: PropTypes.func,
  children: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}


export default Form;