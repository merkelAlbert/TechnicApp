import { isEmpty } from 'lodash-es';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import cn from 'classnames';

//import './style.scss';
import Form from '../../../../components/Form';
import Text from '../../../../components/Form/Text';
import Select from '../../../../components/Form/Select';
import Button from '../../../../components/Button';
import Loader from '../../../../components/Loader';

import { getMachineTypes } from '../../../../store/actions/machineTypes';

class HomeUserMachinesForm extends Component {
  state = {
    disabled: true,
  }

  componentDidMount = () => {
    const { loadData } = this.props;
    loadData();
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
    const { onSubmit, error, isFetching, machineTypes } = this.props;
    const { disabled } = this.state;

    return (
      <>
        <Form
          onSubmit={onSubmit}
          validate={this.validate}
          error={error}
        >
          {({ values }) => (
            <>
              <div className="login-form__row">
                <Text
                  required
                  name="name"
                  label="Имя техники"
                  className="login-form__field"
                />
              </div>
              <div className="registration-form__row">
                <Select
                  required
                  name="machineType"
                  label="Тип техники"
                  items={machineTypes}
                  className="registration-form__field"
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

const mapStateToProps = (state) => {

  const { machineTypes: types } = state;
  let machineTypes = [];
  if (!isEmpty(types)) {
    machineTypes = types.map(type => ({
      id: type.id,
      title: type.name,
    }));
  }

  return {
    error: state.common.machines.error,
    success: state.common.machines.success,
    isFetching: state.common.machines.isFetching,
    machineTypes,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    loadData: async () => {
      try {
        await dispatch(getMachineTypes());
      }
      catch (err) {
        console.log(err);
      }
    },
  }
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(HomeUserMachinesForm);