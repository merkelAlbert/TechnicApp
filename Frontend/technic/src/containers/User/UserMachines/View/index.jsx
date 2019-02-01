import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Add } from '@material-ui/icons';

import { fetchAll } from '../../../../store/actions/machines';

import './style.scss';
import Fab from '../../../../components/Fab';
import Loader from '../../../../components/Loader';

import MachineCard from './MachineCard';

class UserMachinesView extends Component {
  state = {
    open: false,
    message: ''
  };
  componentDidMount = () => {
    const { loadData } = this.props;

    loadData();
  };
  onSuccess = message => {
    console.log(message);
    this.setState({
      open: true,
      message
    });
  };

  render = () => {
    const {
      match: {
        params: { userId }
      },
      data: { machines },
      isFetching
    } = this.props;

    return (
      <div className="user-machines-view">
        <Loader isFetching={isFetching}>
          <div className="user-machines-view__container">
            {machines.map(machine => (
              <MachineCard
                key={machine.id}
                name={machine.name}
                description={machine.description}
                type={machine.type}
              />
            ))}
          </div>
          <Link to={`/user/${userId}/machines/add`}>
            <Fab className="user-machines-view__fab">
              <Add />
            </Fab>
          </Link>
        </Loader>
      </div>
    );
  };
}

const mapStateToProps = state => {
  const { machines = [] } = state;
  const { isFetching } = state.common.machines;

  return { data: { machines }, isFetching };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadData: async () => {
      try {
        await dispatch(fetchAll());
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
