import { isEmpty } from 'lodash-es';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAll } from '../../../../store/actions/machines';

import Loader from '../../../../components/Loader';

import './style.scss';
import MachineCard from '../../../Common/Machines/View/Card';
import Filters from './Filters';

class HomeMachinesView extends Component {
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
      loadData,
      data: { machines, user },
      isFetching,
      error,
      onSuccess
    } = this.props;

    return (
      <div className="home-machines">
        {!isEmpty(user) && <Filters onSubmit={values => loadData(values)} />}
        <div className="home-machines-view">
          <Loader isFetching={isFetching} error={error}>
            {!machines.length && !error && (
              <div className="home-machines-view__empty-message">
                Ничего не найдено!!!
              </div>
            )}
            <div className="home-machines-view__container">
              {machines.map(machine => (
                <MachineCard
                  startUrl="/machines"
                  key={machine.id}
                  machine={machine}
                  onSuccess={onSuccess}
                />
              ))}
            </div>
          </Loader>
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => {
  const { list: machines = [] } = state.machines;
  const { isFetching, error } = state.common.machines;

  return { data: { machines, user: state.user }, isFetching, error };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadData: async values => {
      try {
        await dispatch(
          fetchAll({
            isPrivateOffice: false,
            ...values
          })
        );
      } catch (err) {
        console.log(err);
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeMachinesView);
