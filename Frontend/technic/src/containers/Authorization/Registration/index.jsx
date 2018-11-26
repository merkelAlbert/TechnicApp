import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'react-final-form';
import cn from 'classnames';

import './style.scss';
import Form from '../../../components/Form';
import TextField from '../../../components/Form/TexField';
import Password from '../../../components/Form/Password';
import Button from '../../../components/Button';
import Loader from '../../../components/Loader';

import { register, ACCOUNT_AUTH_FORM_RESET } from '../../../store/actions/account';

class Register extends Component {
  state = {
    disabled: true,
  }

  componentWillUnmount() {
    const { resetForm } = this.props;
    resetForm();
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
    const { className, error, success, isFetching, onSubmit } = this.props;
    const { disabled } = this.state;
    return (
      <>
        <h1 className="registration-form__title">Регистрация</h1>
        <Form
          onSubmit={onSubmit}
          validate={this.validate}
          error={error}
          info={success && 'Регистрация прошла успешно'}
          className={cn('registration-form', className)}
        >
          {() => (
            <>
              <div className="registration-form__row">
                <Field
                  required
                  name="email"
                  component={TextField}
                  type="email"
                  label="Email"
                  className="registration-form__field"
                />
              </div>
              <div className="registration-form__row">
                <Field
                  required
                  name="phone"
                  component={TextField}
                  type="phone"
                  label="Телефон"
                  className="registration-form__field"
                />
              </div>
              <div className="registration-form__row">
                <Field
                  required
                  name="password"
                  component={Password}
                  type="password"
                  label="Пароль"
                  className="registration-form__field"
                />
              </div>
              <div className="registration-form__row">
                <Field
                  required
                  name="repeatedPassword"
                  component={Password}
                  type="password"
                  label="Повторите пароль"
                  className="registration-form__field"
                />
              </div>
              <div className="registration-form__row">
                <Loader isFetching={isFetching} color="secondary">
                  <Button type="submit" color="secondary" disabled={disabled}>Зарегистрироваться</Button>
                </Loader>
              </div>
            </>
          )}
        </Form>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.account.error,
  success: state.account.success,
  isFetching: state.account.isFetching,
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: async (user) => {
    try {
      await dispatch(register(user));
    }
    catch (err) {
      console.log(err);
    }
  },
  resetForm: () => {
    dispatch({ type: ACCOUNT_AUTH_FORM_RESET });
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);