import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Add } from '@material-ui/icons';

import { fetchAll } from '../../../../store/actions/machines';

import './style.scss';
import Fab from '../../../../components/Fab';

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
      data: { machines }
    } = this.props;

    return (
      <div className="user-machines-view">
        <ul>
          {machines.map(machine => (
            <li>{machine.type}</li>
          ))}
        </ul>
        <Link to={`/user/${userId}/machines/add`}>
          <Fab className="user-machines-view__fab">
            <Add />
          </Fab>
        </Link>
      </div>
    );
  };
}

const mapStateToProps = state => {
  const { machines = [] } = state;
  console.log(machines);
  return { data: { machines } };
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
