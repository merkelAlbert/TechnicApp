import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { add } from '../../../../store/actions/orders';
import { fetchOne } from '../../../../store/actions/machines';

import Dialog from '../../../../components/Dialog';
import Form from '../OrderForm';

class HomeMachinesAddOrderDialog extends Component {
  componentDidMount = () => {
    const { loadData } = this.props;
    loadData();
  };

  handleDialogClose = () => {
    const { history } = this.props;
    history.goBack();
  };

  render = () => {
    const {
      match: {
        params: { machineId }
      },
      onSubmit
    } = this.props;

    return (
      <>
        <Dialog
          title="Добавить заказ"
          onClose={this.handleDialogClose}
          open
          fullWidth
        >
          <Form
            onSubmit={onSubmit}
            initialValues={{ machineId }}
            submitButtonTitle="Добавить"
          />
        </Dialog>
      </>
    );
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    match: {
      params: { machineId }
    },
    onSuccess
  } = ownProps;

  return {
    onSubmit: async order => {
      try {
        await dispatch(add(order));
        const { history } = ownProps;
        onSuccess('Заказ успешно добавлен');
        history.goBack();
      } catch (err) {
        console.log(err);
      }
    },
    loadData: async () => {
      try {
        await dispatch(fetchOne(machineId));
      } catch (err) {
        console.log(err);
      }
    }
  };
};

export default compose(
  withRouter,
  connect(
    null,
    mapDispatchToProps
  )
)(HomeMachinesAddOrderDialog);
