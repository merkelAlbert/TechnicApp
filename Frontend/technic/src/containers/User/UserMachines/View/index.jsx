import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Add } from '@material-ui/icons';

import './style.scss';
import Fab from '../../../../components/Fab';

class UserMachinesView extends Component {

  render = () => {
    const {
      match: {
        params: {
          userId,
        }
      }
    } = this.props;

    return (
      <div className="user-machines-view">
        <Link to={`/user/${userId}/machines/add`}>
          <Fab className="user-machines-view__fab">
            <Add />
          </Fab>
        </Link>
      </div>
    )
  }
};

export default UserMachinesView;