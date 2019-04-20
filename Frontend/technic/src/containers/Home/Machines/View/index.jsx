import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAll } from '../../../../store/actions/machines';

import Loader from '../../../../components/Loader';

import './style.scss';
import MachineCard from '../../../Common/Machines/View/Card';

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
      data: { machines },
      isFetching,
      error,
      onSuccess
    } = this.props;

    return (
      <div className="home-machines-view">
        <Loader isFetching={isFetching} error={error}>
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
    );
  };
}

const mapStateToProps = state => {
  const { list: machines = [] } = state.machines;
  const { isFetching, error } = state.common.machines;

  return { data: { machines }, isFetching, error };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadData: async () => {
      try {
        await dispatch(
          fetchAll({
            isPrivateOffice: false,
            specifications: {
              '232267af-86f0-468c-b148-b98f362f792c': '5'
            },
            fromPrice: 1500,
            toPrice: 3000
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
