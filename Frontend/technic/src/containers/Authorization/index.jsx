import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import isEmpty from 'lodash-es/isEmpty'

import './style.scss';

import TabBar from '../../components/TabBar';
import Picture from './technic.jpg';
import Registration from './Registration';
import Login from './Login';

const TABS = ['Регистрация', 'Вход'];

class Authorization extends Component {

  render = () => {
    const { user } = this.props;
    return (
      (user === null || user === undefined || isEmpty(user))
        ?
        < div className="authorization-container" >
          <img src={Picture} className="authorization__picture" alt="картинка" />
          <TabBar values={TABS} className="authorization__tabs">
            <Registration className="authorization__form" />
            <Login className="authorization__form" />
          </TabBar>
        </div >
        :
        <Redirect to="/" />
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps, null)(Authorization);