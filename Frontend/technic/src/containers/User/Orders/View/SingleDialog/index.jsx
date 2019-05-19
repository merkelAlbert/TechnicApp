import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dialog from '../../../../../components/Dialog';
import Loader from '../../../../../components/Loader';

import { fetchOne } from '../../../../../store/actions/orders';
import { FILES } from '../../../../../utils/api';

import './style.scss';

class UserOrdersSingleDialog extends Component {
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
      data: { order },
      isFetching,
      error
    } = this.props;

    return (
      <Dialog
        title="Просмотр заказа"
        open
        onClose={this.handleDialogClose}
        fullWidth
      >
        <Loader isFetching={isFetching} error={error}>
          <>
            {order.machine && (
              <div className="user-orders-single-dialog">
                <div className="user-orders-single-dialog__images">
                  {order.machine.imagesIds &&
                    order.machine.imagesIds.map(imageId => (
                      <img
                        key={imageId}
                        className="user-orders-single-dialog__image"
                        src={`${FILES}/${imageId}`}
                        alt={order.machine.name}
                      />
                    ))}
                </div>
                <p>
                  <span className="user-orders-single-dialog__section-title">
                    Название:
                  </span>{' '}
                  {order.machine.name}
                </p>
                <p>
                  <span className="user-orders-single-dialog__section-title">
                    Тип:
                  </span>{' '}
                  {order.machine.type.name}
                </p>
                <p className="user-orders-single-dialog__section-title">
                  Характеристики:{' '}
                </p>
                <ul>
                  {order.machine.specifications &&
                    order.machine.specifications.map(specification => (
                      <li key={specification.id}>
                        {specification.name}: {specification.value}{' '}
                        {specification.measure || ''}
                      </li>
                    ))}
                </ul>
                <p>
                  <span className="user-orders-single-dialog__section-title">
                    Дата начала аренды:
                  </span>{' '}
                  {new Date(order.fromDate).toLocaleDateString('ru')}
                </p>
                <p>
                  <span className="user-orders-single-dialog__section-title">
                    Дата окончания аренды:
                  </span>{' '}
                  {new Date(order.toDate).toLocaleDateString('ru')}
                </p>
                <p>
                  <span className="user-orders-single-dialog__section-title">
                    Сумма заказа:
                  </span>{' '}
                  {order.machine.price}₽/ч
                </p>
                <br />
                <p>
                  <span className="user-orders-single-dialog__section-title">
                    Комментарий:
                  </span>{' '}
                  {order.comment}
                </p>
              </div>
            )}
          </>
        </Loader>
      </Dialog>
    );
  };
}

const mapStateToProps = state => {
  const { isFetching, error } = state.common.orders;
  const { active: order = {} } = state.orders;

  return { data: { order }, isFetching, error };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    match: {
      params: { orderId }
    }
  } = ownProps;

  return {
    loadData: async () => {
      try {
        await dispatch(fetchOne(orderId));
      } catch (err) {
        console.log(err);
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserOrdersSingleDialog);
