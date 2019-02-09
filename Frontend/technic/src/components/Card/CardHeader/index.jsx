import React from 'react';
import MuiCardHeader from '@material-ui/core/CardHeader';

const CardHeader = ({ title, subTitle, className }) => {
  return (
    <MuiCardHeader
      title={title}
      subheader={subTitle}
      className={className}
    />
  );
};

export default CardHeader;
