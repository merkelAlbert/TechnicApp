import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'react-final-form';

import Form from '../../components/Form';

import { registerUser } from '../../store/actions/account';

class Register extends Component {

  render = () => {

    const { onSubmit } = this.props;

    return (
      <Form onSubmit={onSubmit}>
        {() => (
          <>
            <Field name="email" component="input" type="email" />
            <Field name="password" component="input" type="password" />
            <button type="submit">submit</button>
          </>
        )}
      </Form>
    )
  }
}
const mapDispatchToProps = (dispatch) => ({
  onSubmit: async (user) => {
    try {
      await dispatch(registerUser(user));
      alert('Успешно');
    }
    catch (err) {
      alert(err);
    }
  }
})

export default connect(null, mapDispatchToProps)(Register);