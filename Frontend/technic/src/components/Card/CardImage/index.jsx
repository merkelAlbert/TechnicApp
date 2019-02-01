import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';

const CardImage = ({ image, title, className }) => {
  return (
    <CardMedia
      component="img"
      image={image}
      title={title}
      className={className}
    />
  );
};

export default CardImage;
