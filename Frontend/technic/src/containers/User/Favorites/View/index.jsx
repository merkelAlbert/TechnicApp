import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAll } from '../../../../store/actions/machines';

import Loader from '../../../../components/Loader';

import './style.scss';
import MachineCard from './MachineCard';

class UserFavoritesView extends Component {
  componentDidMount = () => {
    const { loadData } = this.props;

    loadData();
  };

  shouldComponentUpdate = prevProps => {
    const {
      data: { machines }
    } = this.props;
    const {
      data: { machines: prevMachines }
    } = prevProps;

    return (
      (machines.length &&
        !machines.every(machine => prevMachines.includes(machine))) ||
      !machines.length ||
      machines.length !== prevMachines.length
    );
  };

  render = () => {
    const {
      data: { machines },
      isFetching,
      error,
      onSuccess
    } = this.props;

    return (
      <Loader isFetching={isFetching} error={error}>
        {!machines.length && !error && (
          <div className="user-favorites-view__empty-message">
            В избранном ничего нет! Добавьте машину, чтобы не потерять!
          </div>
        )}
        <div className="user-favorites-view__container">
          {machines.map(machine => (
            <MachineCard
              key={machine.id}
              machine={machine}
              onSuccess={onSuccess}
            />
          ))}
        </div>
      </Loader>
    );
  };
}

const mapStateToProps = state => {
  const { list: machines = [] } = state.machines;
  const { isFetching, error } = state.common.machines;

  return {
    data: { machines: machines.filter(machine => machine.isFavorite) },
    isFetching,
    error
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadData: async () => {
      try {
        await dispatch(fetchAll({ isPrivateOffice: true }));
      } catch (err) {
        console.log(err);
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFavoritesView);
