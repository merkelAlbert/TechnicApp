import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'react-final-form';

import './style.scss';
import Form from '../../components/Form';
import TextField from '../../components/Form/TexField';
import Password from '../../components/Form/Password';
import Button from '../../components/Button';

import { registerUser } from '../../store/actions/account';

class Register extends Component {
  state = {
    disabled: true,
  }

  validate = values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
    if (!values.repeatedPassword) {
      errors.repeatedPassword = 'Required';
    }
    if (values.password !== values.repeatedPassword) {
      errors.repeatedPassword = 'Must be the same';
    }
    Object.keys(errors).length === 0
      ? this.setState({
        disabled: false,
      })
      : this.setState({
        disabled: true,
      });

    return errors;
  }

  render = () => {
    const { onSubmit } = this.props;
    const { disabled } = this.state;
    return (
      <Form onSubmit={onSubmit} validate={this.validate}>
        {() => (
          <>
            <div>
              <Field
                required
                name="email"
                component={TextField}
                type="email"
                label="Email"
              />
            </div>
            <div>
              <Field
                required
                name="password"
                component={Password}
                type="password"
                label="Пароль"
              />
            </div>
            <div>
              <Field
                required
                name="repeatedPassword"
                component={Password}
                type="password"
                label="Повторите пароль"
              />
            </div>
            <div>
              <Button type="submit" disabled={disabled}>Зарегистрироваться</Button>
            </div>
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