import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'react-final-form';

import './style.scss';
import Form from '../../components/Form';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

import { registerUser } from '../../store/actions/account';

class Register extends Component {
  state = {
    password: '',
    repeatedPassword: '',
    error: false,
  }

  onPasswordChange = (e) => {
    const { target } = e;
    const { repeatedPassword } = this.state;
    this.setState({
      password: target.value,
    });
    target.value !== repeatedPassword
      ? this.setState({ error: true })
      : this.setState({ error: false });
  }

  onRepeatedPasswordChange = (e) => {
    const { target } = e;
    const { password } = this.state;
    this.setState({
      repeatedPassword: target.value,
    });
    target.value !== password
      ? this.setState({ error: true })
      : this.setState({ error: false });
  }

  render = () => {
    const { onSubmit } = this.props;
    const { error } = this.state;

    return (
      <Form onSubmit={onSubmit}>
        {() => (
          <>
            <div>
              <Field name="email" render={
                () => (
                  <TextInput
                    required
                    placeholder="email"
                    type="email"
                  />
                )}
              />
            </div>
            <div>
              <Field name="password" render={
                () => (
                  <TextInput
                    required
                    onChange={this.onPasswordChange}
                    placeholder="Пароль"
                    type="password"
                  />
                )}
              />
            </div>
            <div>
              <Field name="password-repeat" render={
                () => (
                  <TextInput
                    onChange={this.onRepeatedPasswordChange}
                    error={error}
                    required
                    placeholder="Повторите пароль"
                    type="password"
                  />
                )}
              />
            </div>
            <div>
              <Button type="submit">Зарегистрироваться</Button>
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