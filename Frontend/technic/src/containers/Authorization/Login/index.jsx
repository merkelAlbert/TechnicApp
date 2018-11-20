import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { Field } from 'react-final-form';
import cn from 'classnames';

import './style.scss';
import Form from '../../../components/Form';
import TextField from '../../../components/Form/TexField';
import Password from '../../../components/Form/Password';
import Button from '../../../components/Button';

import { login } from '../../../store/actions/account';

class Login extends Component {
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
    const { onSubmit, className, history } = this.props;
    const { disabled } = this.state;
    return (
      <Form onSubmit={onSubmit} validate={this.validate} className={cn('login-form', className)}>
        {() => (
          <>
            <h1 className="login-form__title">Вход</h1>
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
              <Button type="submit" color="secondary" disabled={disabled}>Войти</Button>
            </div>
          </>
        )}
      </Form>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: async (user) => {
    try {
      await dispatch(login(user));
      const { history } = ownProps;
      history.push('/');
      //alert('Успешно');
    }
    catch (err) {
      alert(err);
    }
  }
});

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(Login);