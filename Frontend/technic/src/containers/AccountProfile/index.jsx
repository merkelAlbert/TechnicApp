import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import { getAccountInfo } from '../../store/actions/account';

class AccountProfile extends Component {

  componentDidMount = () => {
    const {
      match: {
        params: {
          userId
        }
      },
      loadData,
    } = this.props;

    loadData(userId);
  }

  render = () => {
    const { user } = this.props;
    return (
      <div>{user.email}</div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.account.user
});

const mapDispatchToProps = (dispatch) => ({
  loadData: async (userId) => {
    try {
      await dispatch(getAccountInfo(userId));
    }
    catch (err) {
      alert(err);
    }
  }
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(AccountProfile);