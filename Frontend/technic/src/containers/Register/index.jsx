import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'react-final-form';

import './style.scss';
import Form from '../../components/Form';
import TextField from '../../components/Form/TexField';
import Password from '../../components/Form/Password';
import Button from '../../components/Button';
import Picture from './technic.jpg';

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
      <div className="registration-container">
        <img src={Picture} className="registration__picture" alt="картинка" />
        <Form onSubmit={onSubmit} validate={this.validate} className="registration__form">
          {() => (
            <>
              <h1 className="form__title">Регистрация</h1>
              <div className="form__row">
                <Field
                  required
                  name="email"
                  component={TextField}
                  type="email"
                  label="Email"
                  className="form__field"
                />
              </div>
              <div className="form__row">
                <Field
                  required
                  name="phone"
                  component={TextField}
                  type="phone"
                  label="Телефон"
                  className="form__field"
                />
              </div>
              <div className="form__row">
                <Field
                  required
                  name="phone"
                  component={TextField}
                  type="phone"
                  label="Телефон"
                  className="form__field"
                />
              </div><div className="form__row">
                <Field
                  required
                  name="phone"
                  component={TextField}
                  type="phone"
                  label="Телефон"
                  className="form__field"
                />
              </div><div className="form__row">
                <Field
                  required
                  name="phone"
                  component={TextField}
                  type="phone"
                  label="Телефон"
                  className="form__field"
                />
              </div>
              <div className="form__row">
                <Field
                  required
                  name="password"
                  component={Password}
                  type="password"
                  label="Пароль"
                  className="form__field"
                />
              </div>
              <div className="form__row">
                <Field
                  required
                  name="repeatedPassword"
                  component={Password}
                  type="password"
                  label="Повторите пароль"
                  className="form__field"
                />
              </div>
              <div className="form__row">
                <Button type="submit" color="secondary" disabled={disabled}>Зарегистрироваться</Button>
              </div>
            </>
          )}
        </Form>
      </div>
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