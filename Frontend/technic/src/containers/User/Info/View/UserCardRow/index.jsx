import React from 'react';

import './style.scss';

const UserCardRow = ({ title, value }) => (
  <div className="user-card-row">
    <div className="user-card-row__title">{title}</div>
    <div className="user-card-row__value">{value}</div>
  </div>
);

export default UserCardRow;
