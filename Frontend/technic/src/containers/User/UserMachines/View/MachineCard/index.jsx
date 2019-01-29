import React from 'react';

const UserMachineCard = ({ name, type }) => {
  return (
    <>
      <div>{name}</div>
      <div>{type}</div>
    </>
  );
};

export default UserMachineCard;
