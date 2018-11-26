import React from 'react';
import { Form } from 'react-final-form';

const FinalForm = ({
  onSubmit,
  children,
  validate,
  error,
  info,
  ...props
}) => (
  <Form {...props} validate={validate} onSubmit={onSubmit}>
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
  </Form>
);

export default FinalForm;