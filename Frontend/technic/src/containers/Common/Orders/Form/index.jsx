import { isEmpty } from 'lodash-es';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Form from '../../../../components/Form';
import Text from '../../../../components/Form/Text';
import Button from '../../../../components/Button';
import Loader from '../../../../components/Loader';

import './style.scss';

import { FILES } from '../../../../utils/api';

class CommonOrdersForm extends Component {
  state = {
    disabled: true
  };

  validate = values => {
    const errors = {};
    if (!values.fromDate) {
      errors.fromDate = 'Required';
    }
    if (!values.toDate) {
      errors.description = 'Required';
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
    const {
      data: { machine },
      error,
      isFetching,
      initialValues,
      submitButtonTitle,
      onSubmit
    } = this.props;
    const { disabled } = this.state;
    console.log(initialValues);

    return (
      <>
        <Form
          onSubmit={onSubmit}
          validate={this.validate}
          error={error.orders || error.machines}
          initialValues={initialValues}
          className="common-orders-form"
        >
          {() => (
            <>
              <Loader isFetching={isFetching.machines}>
                <div className="common-orders-form__machine-info">
                  <div className="common-orders-form__machine-description">
                    <p>
                      <strong>Название:</strong> {machine.name}
                    </p>
                    {machine.type && (
                      <p>
                        <strong>Тип:</strong> {machine.type.name}
                      </p>
                    )}
                    {!isEmpty(machine.specifications) && (
                      <>
                        <p>
                          <strong>Характеристики:</strong>
                        </p>
                        <ul>
                          {machine.specifications &&
                            machine.specifications.map(specification => (
                              <li key={specification.id}>
                                {specification.name}: {specification.value}{' '}
                                {specification.measure || ''}
                              </li>
                            ))}
                        </ul>
                      </>
                    )}
                    <p>
                      <strong>Сумма заказа:</strong> {machine.price}₽
                    </p>
                  </div>
                  {!isEmpty(machine.imagesIds) && (
                    <img
                      className="common-orders-form__machine-photo"
                      src={`${FILES}/${machine.imagesIds[0]}`}
                      alt={machine.name}
                    />
                  )}
                </div>
              </Loader>
              <div className="common-orders-form__row">
                <Text
                  required
                  type="date"
                  name="fromDate"
                  label="Дата начала аренды"
                  className="common-orders-form__field"
                />
                <Text
                  required
                  type="date"
                  name="toDate"
                  label="Дата окончания аренды"
                  className="common-orders-form__field"
                />
              </div>
              <div className="common-orders-form__row">
                <Text
                  name="comment"
                  label="Комментарий"
                  className="common-orders-form__field"
                />
              </div>
              <div className="common-orders-form__row">
                <Loader isFetching={isFetching.orders}>
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

CommonOrdersForm.defaultProps = {
  className: null,
  error: null
};

CommonOrdersForm.propTypes = {
  className: PropTypes.string,
  error: PropTypes.shape(),
  onSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.shape({}).isRequired
};

const mapStateToProps = (state, ownProps) => ({
  data: {
    machine: (ownProps.data || {}).machine || state.machines.active
  },
  isFetching: {
    machines: state.common.machines.isFetching,
    orders: state.common.orders.isFetching
  },
  error: {
    machines: state.common.machines.error,
    orders: state.common.orders.error
  }
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    null
  )
)(CommonOrdersForm);
