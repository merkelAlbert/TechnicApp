import { isEmpty, find } from 'lodash-es';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FieldArray } from 'react-final-form-arrays';

import Checkbox from '../../../../components/Checkbox';
import Form from '../../../../components/Form';
import Text from '../../../../components/Form/Text';
import Select from '../../../../components/Form/Select';
import Button from '../../../../components/Button';
import Loader from '../../../../components/Loader';
import Uploader from '../../../../components/Uploader';

import './style.scss';

import { fetchAll } from '../../../../store/actions/machineTypes';
import { add } from '../../../../store/actions/files';
import machineStatuses from '../../../../constants/machineStatuses';

const statuses = Object.keys(machineStatuses).map(
  machineStatus => machineStatuses[machineStatus]
);

class UserMachinesForm extends Component {
  uploader = null;
  state = {
    disabled: true,
    checked: false,
    specifications: []
  };

  componentDidMount = () => {
    const { loadData } = this.props;
    loadData();
  };

  componentDidUpdate = prevProps => {
    const { initialValues } = this.props;
    if (
      initialValues &&
      initialValues.type &&
      initialValues !== prevProps.initialValues
    ) {
      this.setState({
        specifications: initialValues.type.allowedSpecifications
      });
    }
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
    if (!values.price) {
      errors.price = 'Required';
    }
    if (!values.status && values.status !== 0) {
      errors.status = 'Required';
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

  onSubmit = async machine => {
    const { onSubmit, uploadFiles } = this.props;
    const { specifications, checked } = this.state;
    const machineCopy = { ...machine };
    const { files } = this.uploader;
    const formData = new FormData();

    if (checked) {
      machineCopy.imagesIds = null;
    } else {
      if (files.length) {
        for (let i = 0; i < files.length; i++)
          formData.append('files', files[i]);
        const imagesIds = await uploadFiles(formData);
        machineCopy.imagesIds = imagesIds;
      }
    }

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

  handleCkeckboxClick = () => {
    this.setState(prevState => ({
      checked: !prevState.checked
    }));
  };

  render = () => {
    const {
      error,
      isFetching,
      machineTypes,
      initialValues,
      submitButtonTitle
    } = this.props;
    const { specifications, disabled, checked } = this.state;

    return (
      <>
        <Form
          onSubmit={this.onSubmit}
          validate={this.validate}
          error={error.machines}
          initialValues={initialValues}
          className="machine-form"
        >
          {() => (
            <>
              <Loader
                isFetching={isFetching.machineTypes}
                error={error.machineTypes}
              >
                <div className="machine-form__row">
                  <Text
                    required
                    name="name"
                    label="Название"
                    className="machine-form__field"
                  />
                </div>
                <div className="machine-form__row">
                  <Text
                    required
                    multiline
                    name="description"
                    label="Описание"
                    className="machine-form__field"
                  />
                </div>
                <div className="machine-form__row">
                  <Select
                    required
                    name="machineTypeId"
                    label="Тип техники"
                    items={machineTypes}
                    className="machine-form__field"
                    onMutation={this.handleMachineTypeChange}
                  />
                </div>
                <FieldArray name="specifications">
                  {() => (
                    <div className="machine-form__specifications">
                      {specifications.map((specification, index) => {
                        return (
                          <div
                            key={specification.name}
                            className="machine-form__specification"
                          >
                            <Text
                              name={`specifications[${index}].value`}
                              label={specifications[index].name}
                              className="machine-form__field"
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </FieldArray>
                <div className="machine-form__row">
                  <Text
                    required
                    name="price"
                    label="Цена"
                    className="machine-form__field"
                  />
                </div>
                <div className="machine-form__row">
                  <Select
                    required
                    name="status"
                    label="Статус техники"
                    items={statuses}
                    className="machine-form__field"
                  />
                </div>
                <div className="machine-form__checkbox">
                  <Checkbox
                    label="Без фотографий"
                    onClick={this.handleCkeckboxClick}
                  />
                </div>
                <div className="machine-form__uploader">
                  {!checked && (
                    <Uploader
                      innerRef={child => {
                        if (child) this.uploader = child.ref;
                      }}
                      name="images"
                      title="Загрузить фотографии (старые фотографии будут удалены)"
                    />
                  )}
                </div>
              </Loader>
              <div className="machine-form__row">
                <Loader isFetching={isFetching.machines || isFetching.files}>
                  <Button type="submit" disabled={disabled}>
                    {submitButtonTitle}
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
  error: PropTypes.shape(),
  onSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.shape({}).isRequired
};

const mapStateToProps = state => {
  const { machineTypes: types } = state;
  let machineTypes = [];
  if (!isEmpty(types)) {
    machineTypes = types.map(type => ({
      id: type.id,
      title: type.name,
      specifications: type.allowedSpecifications
    }));
  }

  return {
    error: {
      machines: state.common.machines.error,
      files: state.common.files.error,
      machineTypes: state.common.machineTypes.error
    },
    success: {
      machines: state.common.machines.success,
      files: state.common.files.success,
      machineTypes: state.common.machineTypes.success
    },
    isFetching: {
      machines: state.common.machines.isFetching,
      files: state.common.files.isFetching,
      machineTypes: state.common.machineTypes.isFetching
    },
    machineTypes,
    files: state.files
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
    },
    uploadFiles: async formData => {
      try {
        return await dispatch(add(formData));
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
