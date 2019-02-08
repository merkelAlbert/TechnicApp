import PropTypes from 'prop-types';
import React from 'react';
import MuiSwitch from '@material-ui/core/Switch';

const Switch = ({ onChange, checked, value, color }) => {
  return <MuiSwitch value={value} color={color} onChange={onChange} checked={checked} />;
};

Switch.defaultProps = {
  color: 'primary',
};

Switch.propTypes = {
  color: PropTypes.string,
}


export default Switch;
