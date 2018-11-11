import React from 'react';
import { connect } from 'react-redux';

import './style.scss';

const Home = () => (
  <div>Главная</div>
);

const mapStateToProps = state => {
  
}

export default connect(mapStateToProps, null)(Home);
