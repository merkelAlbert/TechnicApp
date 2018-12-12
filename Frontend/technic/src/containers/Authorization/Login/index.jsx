import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import cn from 'classnames';

import './style.scss';
import Form from '../../../components/Form';
import Text from '../../../components/Form/Text';
import Password from '../../../components/Form/Password';
import Button from '../../../components/Button';
import Loader from '../../../components/Loader';

import { login, USER_AUTH_FORM_RESET } from '../../../store/actions/user';

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
                <Text
                  required
                  name="email"
                  type="email"
                  label="Email"
                  className="login-form__field"
                />
              </div>
              <div className="login-form__row">
                <Password
                  required
                  name="password"
                  label="Пароль"
                  className="login-form__field"
                />
              </div>
              <div className="login-form__row">
                <Loader isFetching={isFetching}>
                  <Button type="submit" disabled={disabled}>Войти</Button>
                </Loader>
              </div>
            </>
          )}
        </Form>
      </>
    )
  }
}

Login.defaultProps = {
  className: null,
  error: null,
};

Login.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  error: state.common.user.error,
  success: state.common.user.success,
  isFetching: state.common.user.isFetching,
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
      dispatch({ type: USER_AUTH_FORM_RESET });
    }
  }
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Login);