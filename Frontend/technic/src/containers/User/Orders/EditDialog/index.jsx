import moment from 'moment';
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { update, fetchOne } from '../../../../store/actions/orders';

import Dialog from '../../../../components/Dialog';
import Form from '../../../Common/Orders/Form';

class UserOrdersEditDialog extends Component {
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
      onSubmit,
      data: { order }
    } = this.props;

    return (
      <>
        <Dialog
          title="Изменить заказ"
          onClose={this.handleDialogClose}
          open
          fullWidth
        >
          <Form
            onSubmit={onSubmit}
            data={{ machine: { ...order.machine } }}
            initialValues={{
              machineId: order.machine ? order.machine.id : '',
              fromDate: moment(order.fromDate).format(moment.HTML5_FMT.DATE),
              toDate: moment(order.toDate).format(moment.HTML5_FMT.DATE),
              comment: order.comment
            }}
            submitButtonTitle="Изменить"
          />
        </Dialog>
      </>
    );
  };
}

const mapStateToProps = state => {
  const { active: order = {} } = state.orders;

  return { data: { order } };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    onSuccess,
    match: {
      params: { orderId }
    }
  } = ownProps;

  return {
    onSubmit: async order => {
      try {
        await dispatch(update(orderId, order));
        const { history } = ownProps;
        onSuccess('Заказ успешно изменен');
        history.goBack();
      } catch (err) {
        console.log(err);
      }
    },
    loadData: async () => {
      try {
        await dispatch(fetchOne(orderId));
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
)(UserOrdersEditDialog);
