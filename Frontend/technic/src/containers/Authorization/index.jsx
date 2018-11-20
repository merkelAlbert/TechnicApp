import React, { Component } from 'react';

import './style.scss';

import TabBar from '../../components/TabBar';
import Picture from './technic.jpg';
import Registration from './Registration';
import Login from './Login';


const TABS = ['Регистрация', 'Вход'];

class Authorization extends Component {

  render = () => {
    const { history } = this.props;
    
    return (
      <div className="authorization-container">
        <img src={Picture} className="authorization__picture" alt="картинка" />
        <TabBar
          values={TABS}
          className="authorization__tabs"
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Registration className="authorization__form" />
          <Login history={history} className="authorization__form" />
        </TabBar>

      </div>
    )
  }
}


export default Authorization;