import { isEmpty, find } from 'lodash-es';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FieldArray } from 'react-final-form-arrays';

import Form from '../../../../components/Form';
import Text from '../../../../components/Form/Text';
import Button from '../../../../components/Button';
import Loader from '../../../../components/Loader';

import './style.scss';

class UserInfoForm extends Component {
  state = {
    disabled: true
  };
  componentDidMount = () => {};

  validate = values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    }
    if (!values.phone) {
      errors.name = 'Required';
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

  // onSubmit = async machine => {
  //   const { onSubmit, uploadFiles } = this.props;
  //   const { specifications } = this.state;
  //   const machineCopy = { ...machine };
  //   const { files } = this.uploader;
  //   const formData = new FormData();

  //   if (files.length) {
  //     for (let i = 0; i < files.length; i++) formData.append('files', files[i]);
  //     const imagesIds = await uploadFiles(formData);
  //     machineCopy.imagesIds = imagesIds;
  //   }

  //   if (!isEmpty(machine.specifications)) {
  //     machineCopy.specifications = machine.specifications.map((spec, index) => {
  //       const { value } = spec;
  //       const id = specifications[index].id;

  //       return { id, value };
  //     });
  //   }
  //   onSubmit(machineCopy);
  // };

  // handleMachineTypeChange = id => {
  //   const { machineTypes } = this.props;
  //   const selectedType = find(machineTypes, type => type.id === id);
  //   this.setState({
  //     specifications: selectedType.specifications
  //   });
  // };

  render = () => {
    const {
      submitButtonTitle,
      onSubmit,
      initialValues,
      isFetching,
      error
    } = this.props;
    const { disabled } = this.state;

    return (
      <>
        <Form
          onSubmit={onSubmit}
          validate={this.validate}
          error={error}
          initialValues={initialValues}
          className="user-info-form"
        >
          {() => (
            <>
              <div className="user-info-form__row">
                <Text
                  required
                  name="name"
                  label="Название"
                  className="user-info-form__field"
                />
                <Text
                  required
                  name="phone"
                  label="Телефон"
                  className="user-info-form__field"
                />
              </div>
              <div className="user-info-form__row">
                <Text
                  multiline
                  name="description"
                  label="Описание"
                  className="user-info-form__field"
                />
              </div>

              <div className="user-info-form__row">
                <Text
                  multiline
                  name="address"
                  label="Адрес"
                  className="user-info-form__field"
                />
              </div>
              <div className="user-info-form__row">
                <Loader isFetching={isFetching}>
                  <Button disabled={disabled} type="submit">
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

const mapStateToProps = state => ({
  isFetching: state.user.isFetching,
  error: state.user.error
});

export default connect(mapStateToProps)(UserInfoForm);
