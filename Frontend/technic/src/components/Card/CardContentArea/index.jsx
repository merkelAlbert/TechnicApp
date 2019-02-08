import React from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';

const CardContentArea = ({ onClick, children }) => {
  return <CardActionArea onClick={onClick}>{children}</CardActionArea>;
};

export default CardContentArea;
