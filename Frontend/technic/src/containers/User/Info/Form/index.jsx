import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Form from '../../../../components/Form';
import Text from '../../../../components/Form/Text';
import Button from '../../../../components/Button';
import Loader from '../../../../components/Loader';

import './style.scss';

const UserInfoForm = ({
  submitButtonTitle,
  onSubmit,
  initialValues,
  isFetching,
  error
}) => {
  const [disabled, setDisabled] = useState(true);

  const validate = values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    }
    if (!values.phone) {
      errors.name = 'Required';
    }
    Object.keys(errors).length === 0 ? setDisabled(false) : setDisabled(true);

    return errors;
  };

  return (
    <>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        error={error}
        initialValues={initialValues}
        className="user-info-form"
      >
        {() => (
          <>
            {/* <div className="user-info-form__row">
              <Text
                required
                name="email"
                type="email"
                label="Email"
                className="user-info-form__field"
              />
            </div> */}
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
                type="tel"
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

const mapStateToProps = state => ({
  isFetching: state.common.user.isFetching,
  error: state.common.user.error
});

export default connect(mapStateToProps)(UserInfoForm);
