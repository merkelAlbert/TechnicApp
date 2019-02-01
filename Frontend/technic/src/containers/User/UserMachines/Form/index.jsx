import { isEmpty, find } from 'lodash-es';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FieldArray } from 'react-final-form-arrays';
import cn from 'classnames';

import './style.scss';
import Form from '../../../../components/Form';
import Text from '../../../../components/Form/Text';
import Select from '../../../../components/Form/Select';
import Button from '../../../../components/Button';
import Loader from '../../../../components/Loader';

import { fetchAll } from '../../../../store/actions/machineTypes';

class UserMachinesForm extends Component {
  state = {
    disabled: true,
    specifications: []
  };

  componentDidMount = () => {
    const { loadData } = this.props;
    loadData();
  };

  validate = values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    }
    if (!values.description) {
      errors.description = 'Required';
    }
    if (!values.machineTypeId) {
      errors.machineTypeId = 'Required';
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

  onSubmit = machine => {
    const { onSubmit } = this.props;
    const { specifications } = this.state;
    const machineCopy = { ...machine };
    if (!isEmpty(machine.specifications)) {
      machineCopy.specifications = machine.specifications.map((spec, index) => {
        const { value } = spec;
        const id = specifications[index].id;

        return { id, value };
      });
    }
    onSubmit(machineCopy);
  };

  handleMachineTypeChange = id => {
    const { machineTypes } = this.props;
    const selectedType = find(machineTypes, type => type.id === id);
    this.setState({
      specifications: selectedType.specifications
    });
  };

  render = () => {
    const { error, isFetching, machineTypes } = this.props;
    const { specifications, disabled } = this.state;

    return (
      <>
        <Form
          onSubmit={this.onSubmit}
          validate={this.validate}
          error={error}
          className="add-machine-form"
        >
          {() => (
            <>
              <div className="add-machine-form__row">
                <Text
                  required
                  name="name"
                  label="Название"
                  className="add-machine-form__field"
                />
              </div>
              <div className="add-machine-form__row">
                <Text
                  required
                  multiline
                  name="description"
                  label="Описание"
                  className="add-machine-form__field"
                />
              </div>
              <div className="add-machine-form__row">
                <Select
                  required
                  name="machineTypeId"
                  label="Тип техники"
                  items={machineTypes}
                  className="add-machine-form__field"
                  onMutation={this.handleMachineTypeChange}
                />
              </div>
              <FieldArray name="specifications">
                {() => (
                  <div className="add-machine-form__row">
                    {specifications.map((specification, index) => {
                      return (
                        <Fragment key={specification.title}>
                          <Text
                            name={`specifications[${index}].value`}
                            label={specifications[index].title}
                            className="add-machine-form__field"
                          />
                        </Fragment>
                      );
                    })}
                  </div>
                )}
              </FieldArray>
              <div className="add-machine-form__row">
                <Loader isFetching={isFetching}>
                  <Button type="submit" disabled={disabled}>
                    Добавить
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

UserMachinesForm.defaultProps = {
  className: null,
  error: null
};

UserMachinesForm.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  const { machineTypes: types } = state;
  let machineTypes = [];
  if (!isEmpty(types)) {
    machineTypes = types.map(type => ({
      id: type.id,
      title: type.name,
      specifications: type.allowedSpecifications.map(specification => ({
        id: specification.id,
        title: specification.name
      }))
    }));
  }

  return {
    error: state.common.machines.error,
    success: state.common.machines.success,
    isFetching: state.common.machines.isFetching,
    machineTypes
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadData: async () => {
      try {
        await dispatch(fetchAll());
      } catch (err) {
        console.log(err);
      }
    }
  };
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UserMachinesForm);
