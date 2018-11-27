import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter, Switch, Route } from 'react-router-dom';

import './style.scss';
import EditAccount from './EditAccount';
import AccountInfo from './AccountInfo';
import Sidebar from './Sidebar';
import AccountMachines from './AccountMachines';
import AccountFeedbacks from './AccountFeedbacks';

import { getAccountInfo } from '../../store/actions/account';

class Account extends Component {

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
      <>
        <Sidebar className="account-profile__sidebar" user={user} />
        <div className="account-profile__main">
          <Switch>
            <Route exact path="/account/:userId" component={AccountInfo} />
            <Route path="/account/:userId/edit" component={EditAccount} />
            <Route path="/account/:userId/machines" component={AccountMachines} />
            <Route path="/account/:userId/feedbacks" component={AccountFeedbacks} />
          </Switch>
        </div>
      </>
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
)(Account);