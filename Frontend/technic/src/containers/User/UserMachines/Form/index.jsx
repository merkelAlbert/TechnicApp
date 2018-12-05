import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field } from 'react-final-form';
import cn from 'classnames';

//import './style.scss';
import Form from '../../../../components/Form';
import TextField from '../../../../components/Form/TexField';
import Password from '../../../../components/Form/Password';
import Button from '../../../../components/Button';
import Loader from '../../../../components/Loader';

//import { login, USER_AUTH_FORM_RESET } from '../../../store/actions/user';

class HomeUserMachinesForm extends Component {
  state = {
    disabled: true,
  }

  validate = values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
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
    const { onSubmit, error, isFetching } = this.props;
    const { disabled } = this.state;
    console.log(this.props);

    return (
      <>
        <Form
          onSubmit={onSubmit}
          validate={this.validate}
          error={error}
        >
          {() => (
            <>
              <div className="login-form__row">
                <Field
                  required
                  name="name"
                  component={TextField}
                  label="Имя техники"
                  className="login-form__field"
                />
              </div>
              <div className="login-form__row">
                <Loader isFetching={isFetching}>
                  <Button type="submit" disabled={disabled}>Добавить</Button>
                </Loader>
              </div>
            </>
          )}
        </Form>
      </>
    )
  }
}

HomeUserMachinesForm.defaultProps = {
  className: null,
  error: null,
};

HomeUserMachinesForm.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  error: state.machines.error,
  success: state.machines.success,
  isFetching: state.machines.isFetching,
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(HomeUserMachinesForm);