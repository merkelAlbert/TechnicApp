import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Add } from '@material-ui/icons';

import { fetchAll } from '../../../../store/actions/machines';

import Fab from '../../../../components/Fab';
import Loader from '../../../../components/Loader';
import Link from '../../../../components/Link';

import './style.scss';
import MachineCard from '../../../Common/Machines/View/Card';

class UserMachinesView extends Component {
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
      match: {
        params: { userId }
      },
      data: { machines },
      isFetching,
      error
    } = this.props;

    return (
      <>
        <Loader isFetching={isFetching} error={error}>
          {!machines.length && !error && (
            <div className="user-machines-view__empty-message">
              Техника отсутствует. Добавьте свою первую машину!
            </div>
          )}
          <div className="user-machines-view__container">
            {machines.map(machine => (
              <MachineCard
                key={machine.id}
                startUrl={`/user/${userId}/machines`}
                userId={userId}
                machine={machine}
                isPrivateOffice
              />
            ))}
          </div>
        </Loader>
        <Link to={`/user/${userId}/machines/add`}>
          <Fab className="user-machines-view__fab">
            <Add />
          </Fab>
        </Link>
      </>
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
)(UserMachinesView);
