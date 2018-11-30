import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field } from 'react-final-form';
import cn from 'classnames';

import './style.scss';
import accountRoles from '../../../constants/roles';
import Form from '../../../components/Form';
import TextField from '../../../components/Form/TexField';
import Password from '../../../components/Form/Password';
import Button from '../../../components/Button';
import Loader from '../../../components/Loader';
import Select from '../../../components/Form/Select';

import { register, ACCOUNT_AUTH_FORM_RESET } from '../../../store/actions/account';

class Registration extends Component {
  state = {
    disabled: true,
  }

  componentWillUnmount() {
    const { resetForm } = this.props;
    resetForm();
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

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
    if (!values.accountRole && values.accountRole!==0) {
      errors.role = 'Required';
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
    const { className, error, isSuccess, isFetching, onSubmit } = this.props;
    const { disabled } = this.state;
    const roles = Object.keys(accountRoles).map(role => {
      return accountRoles[role];
    });

    return (
      <>
        <h1 className="registration-form__title">Регистрация</h1>
        <Form
          onSubmit={onSubmit}
          validate={this.validate}
          error={error}
          info={isSuccess ? 'Регистрация прошла успешно' : ''}
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
                  label="Пароль"
                  className="registration-form__field"
                />
              </div>
              <div className="registration-form__row">
                <Field
                  required
                  name="repeatedPassword"
                  component={Password}
                  label="Повторите пароль"
                  className="registration-form__field"
                />
              </div>
              <div className="registration-form__row">
                <Field
                  required
                  name="accountRole"
                  label="Тип"
                  component={Select}
                  items={roles}
                  className="registration-form__field"
                />
              </div>
              <div className="registration-form__row">
                <Loader isFetching={isFetching}>
                  <Button type="submit" disabled={disabled}>Зарегистрироваться</Button>
                </Loader>
              </div>
            </>
          )}
        </Form>
      </>
    )
  }
}

Registration.defaultProps = {
  className: null,
  error: null,
  isSuccess: false,
};

Registration.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  isSuccess: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};


const mapStateToProps = (state) => ({
  error: state.account.error,
  isSuccess: state.account.isSuccess,
  isFetching: state.account.isFetching,
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: async (user) => {
    try {
      console.log(user);
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

export default connect(mapStateToProps, mapDispatchToProps)(Registration);