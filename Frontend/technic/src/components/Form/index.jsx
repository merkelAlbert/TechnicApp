import React from 'react';
import { Form } from 'react-final-form';

const FinalForm = ({ onSubmit, children, validate, ...props }) => (
  <Form {...props} validate={validate} onSubmit={onSubmit}>
    {({ handleSubmit, className }) => (
      <form onSubmit={handleSubmit} className={className}>
        {children(props)}
      </form>
    )}
  </Form>
);

export default FinalForm;