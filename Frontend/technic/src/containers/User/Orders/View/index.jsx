import { find } from 'lodash-es';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Create, Clear } from '@material-ui/icons';

import { fetchAll, update } from '../../../../store/actions/orders';

import Loader from '../../../../components/Loader';
import Link from '../../../../components/Link';
import Divider from '../../../../components/Divider';
import IconButton from '../../../../components/IconButton';
import Select from '../../../../components/Select';

import orderStatuses from '../../../../constants/orderStatuses';
import userRoles from '../../../../constants/roles';

import './style.scss';
//import MachineCard from './MachineCard';

class UserOrdersView extends Component {
  componentDidMount = () => {
    const { loadData } = this.props;

    loadData();
  };

  shouldComponentUpdate = prevProps => {
    const {
      data: { orders }
    } = this.props;
    const {
      data: { orders: prevOrders }
    } = prevProps;

    return (
      (orders.length && !orders.every(order => prevOrders.includes(order))) ||
      !orders.length ||
      orders.length !== prevOrders.length
    );
  };

  handleStatusChange = event => {};

  render = () => {
    const {
      match: {
        params: { userId }
      },
      user,
      data: { orders, statuses },
      isFetching,
      error,
      updateStatus
    } = this.props;

    return (
      <Loader isFetching={isFetching} error={error}>
        {!orders.length && !error ? (
          <div className="user-orders-view__empty-message">
            Заказы отсутсвуют!
          </div>
        ) : (
          <div className="user-orders-view__container">
            <table className="user-orders-view__orders">
              <tbody>
                <tr className="user-orders-view__orders-row">
                  <th className="user-orders-view__orders-cell">
                    {user.role === userRoles.company.id
                      ? 'Пользователь'
                      : 'Компания'}
                  </th>
                  <th className="user-orders-view__orders-cell">Телефон</th>
                  <th className="user-orders-view__orders-cell">Машина</th>
                  <th className="user-orders-view__orders-cell">Цена</th>
                  <th className="user-orders-view__orders-cell">
                    Дата создания
                  </th>
                  <th className="user-orders-view__orders-cell">Статус</th>
                  <th className="user-orders-view__orders-action" />
                  <th className="user-orders-view__orders-action" />
                </tr>
                {orders.map(order => (
                  <>
                    <tr className="user-orders-view__orders-row">
                      <td colSpan="100">
                        <Divider className="user-orders-view__divider" />
                      </td>
                    </tr>
                    <tr className="user-orders-view__orders-row">
                      <td className="user-orders-view__orders-cell">
                        {user.role === userRoles.company.id
                          ? order.person.name
                          : order.company.name}
                      </td>
                      <td className="user-orders-view__orders-cell">
                        {user.role === userRoles.company.id
                          ? order.person.phone
                          : order.company.phone}
                      </td>
                      <td className="user-orders-view__orders-cell">
                        {order.machine.name}
                      </td>
                      <td className="user-orders-view__orders-cell">
                        {order.machine.price}
                      </td>
                      <td className="user-orders-view__orders-cell">
                        {new Date(order.creationDate).toLocaleDateString('ru')}
                      </td>
                      <td className="user-orders-view__orders-cell">
                        {user.role === userRoles.company.id ? (
                          <Select
                            required
                            value={order.status}
                            items={statuses}
                            onChange={updateStatus(order.id)}
                          />
                        ) : (
                          find(statuses, { id: order.status }).title
                        )}
                      </td>
                      <td className="user-orders-view__orders-action">
                        <IconButton>
                          <Create color="primary" />
                        </IconButton>
                      </td>
                      <td className="user-orders-view__orders-action">
                        <Link to={`/user/${userId}/orders/remove/${order.id}`}>
                          <IconButton>
                            <Clear color="error" />
                          </IconButton>
                        </Link>
                      </td>
                    </tr>
                  </>
                ))}
                <tr className="user-orders-view__orders-row">
                  <td colSpan="100">
                    <Divider className="user-orders-view__divider" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </Loader>
    );
  };
}

const mapStateToProps = state => {
  const { user } = state;
  const { list: orders = [] } = state.orders;
  const { isFetching, error } = state.common.orders;
  const statuses = { ...orderStatuses };
  if (user.role === userRoles.company.id) {
    statuses.created.disabled = true;
  }

  return {
    user,
    data: { orders, statuses: Object.values(statuses) },
    isFetching,
    error
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
    updateStatus: orderId => async event => {
      try {
        await dispatch(update(orderId, { status: event.target.value }));
      } catch (err) {
        console.log(err);
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserOrdersView);
