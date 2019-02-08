import React from 'react';
import { Link as ReactLink } from 'react-router-dom';

const style = {
  color: 'inherit',
  textDecoration: 'none'
};

const Link = ({ children, ...props }) => <ReactLink {...props} style={style}>{children}</ReactLink>;

export default Link;

