import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cn from 'classnames';

import Form from '../../../components/Form';
import Text from '../../../components/Form/Text';
import Password from '../../../components/Form/Password';
import Button from '../../../components/Button';
import Loader from '../../../components/Loader';
import Select from '../../../components/Form/Select';

import './style.scss';

import { register } from '../../../store/actions/user';
import userRoles from '../../../constants/roles';

const roles = Object.keys(userRoles).map(userRole => userRoles[userRole]);
class Registration extends Component {
  state = {
    disabled: true
  };

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
    if (!values.role && values.role !== 0) {
      errors.role = 'Required';
    }
    if (values.password !== values.repeatedPassword) {
      errors.repeatedPassword = 'Must be the same';
    }
    Object.keys(errors).length === 0
      ? this.setState({
          disabled: false
        })
      : this.setState({
          disabled: true
        });

    return errors;
  };

  render = () => {
    const { className, error, isSuccess, isFetching, onSubmit } = this.props;
    const { disabled } = this.state;

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
                <Text
                  required
                  name="email"
                  type="email"
                  label="Email"
                  className="registration-form__field"
                />
              </div>
              <div className="registration-form__row">
                <Text
                  required
                  name="phone"
                  type="tel"
                  label="Телефон"
                  className="registration-form__field"
                />
              </div>
              <div className="registration-form__row">
                <Password
                  required
                  name="password"
                  label="Пароль"
                  className="registration-form__field"
                />
              </div>
              <div className="registration-form__row">
                <Password
                  required
                  name="repeatedPassword"
                  label="Повторите пароль"
                  className="registration-form__field"
                />
              </div>
              <div className="registration-form__row">
                <Select
                  required
                  name="role"
                  label="Тип"
                  items={roles}
                  className="registration-form__field"
                />
              </div>
              <div className="registration-form__row">
                <Loader isFetching={isFetching}>
                  <Button type="submit" disabled={disabled}>
                    Зарегистрироваться
                  </Button>
                </Loader>
              </div>
            </>
          )}
        </Form>
      </>
    );
  };
}

Registration.defaultProps = {
  className: null,
  error: null,
  isSuccess: false
};

Registration.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  isSuccess: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  error: state.common.user.error,
  isSuccess: state.common.user.isSuccess,
  isFetching: state.common.user.isFetching
});

const mapDispatchToProps = dispatch => ({
  onSubmit: async user => {
    try {
      await dispatch(register(user));
    } catch (err) {
      console.log(err);
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Registration);
