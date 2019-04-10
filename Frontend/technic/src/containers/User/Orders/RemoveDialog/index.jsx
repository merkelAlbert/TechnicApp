import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { remove } from '../../../../store/actions/orders';

import Button from '../../../../components/Button';
import Loader from '../../../../components/Loader';
import Dialog from '../../../../components/Dialog';
import DialogActions from '../../../../components/Dialog/DialogActions';

class UserOrdersRemoveDialog extends Component {
  handleDialogClose = () => {
    const { history } = this.props;
    history.goBack();
  };

  render = () => {
    const { onSubmit, isFetching, error } = this.props;

    return (
      <>
        <Dialog
          title="Удалить заказ?"
          onClose={this.handleDialogClose}
          open
          fullWidth
        >
          <p>Отменить это действие будет невозможно!!!</p>
          <DialogActions>
            {!isFetching && (
              <Button color="secondary" onClick={this.handleDialogClose}>
                Отмена
              </Button>
            )}
            <Loader isFetching={isFetching} error={error}>
              <Button onClick={onSubmit}>Удалить</Button>
            </Loader>
          </DialogActions>
        </Dialog>
      </>
    );
  };
}

const mapStateToProps = state => ({
  isFetching: state.common.orders.isFetching,
  error: state.common.orders.error
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    onSuccess,
    match: {
      params: { orderId }
    }
  } = ownProps;

  return {
    onSubmit: async () => {
      try {
        await dispatch(remove(orderId));
        const { history } = ownProps;
        onSuccess('Заказ успешно удален');
        history.goBack();
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
)(UserOrdersRemoveDialog);
