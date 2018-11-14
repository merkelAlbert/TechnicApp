import React from 'react';
import { Form } from 'react-final-form';

const FinalForm = ({ onSubmit, children, ...props }) => (
  <Form {...props} onSubmit={onSubmit}>
    {({ handleSubmit, ...props }) => (
      <form onSubmit={handleSubmit}>
        {children(props)}
      </form>
    )}
  </Form>
);

export default FinalForm;