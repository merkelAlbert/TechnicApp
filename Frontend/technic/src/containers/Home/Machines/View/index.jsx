import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Add } from '@material-ui/icons';

import { fetchAll } from '../../../../store/actions/machines';

import Fab from '../../../../components/Fab';
import Loader from '../../../../components/Loader';
import Link from '../../../../components/Link';

import './style.scss';
import MachineCard from './MachineCard';

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
      error
    } = this.props;

    return (
      <Loader isFetching={isFetching} error={error}>
        <div className="home-machines-view__container">
          {machines.map(machine => (
            <MachineCard key={machine.id} machine={machine} />
          ))}
        </div>
      </Loader>
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
        await dispatch(fetchAll({ isPrivateOffice: false }));
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
