import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field } from 'react-final-form';
import cn from 'classnames';

import './style.scss';
import Form from '../../../components/Form';
import TextField from '../../../components/Form/TexField';
import Password from '../../../components/Form/Password';
import Button from '../../../components/Button';
import Loader from '../../../components/Loader';

import { login, ACCOUNT_AUTH_FORM_RESET } from '../../../store/actions/account';

class Login extends Component {
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
    const { onSubmit, className, error, isFetching } = this.props;
    const { disabled } = this.state;

    return (
      <>
        <h1 className="login-form__title">Вход</h1>
        <Form
          onSubmit={onSubmit}
          validate={this.validate}
          error={error}
          className={cn('login-form', className)}
        >
          {() => (
            <>
              <div className="login-form__row">
                <Field
                  required
                  name="email"
                  component={TextField}
                  type="email"
                  label="Email"
                  className="login-form__field"
                />
              </div>
              <div className="login-form__row">
                <Field
                  required
                  name="password"
                  component={Password}
                  type="password"
                  label="Пароль"
                  className="login-form__field"
                />
              </div>
              <div className="login-form__row">
                <Loader isFetching={isFetching} color="secondary">
                  <Button type="submit" color="secondary" disabled={disabled}>Войти</Button>
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
});

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    onSubmit: async (user) => {
      try {
        await dispatch(login(user));
        const { history } = ownProps;
        history.push('/');
      }
      catch (err) {
        console.log(err);
      }
    },
    resetForm: () => {
      dispatch({ type: ACCOUNT_AUTH_FORM_RESET });
    }
  }
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Login);