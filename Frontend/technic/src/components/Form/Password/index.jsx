import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  input: {
    margin: theme.spacing.unit,
  },
});

const EndAdornment = ({ onClick, isVisible }) => (
  <IconButton onClick={onClick}>
    {isVisible ? <Visibility /> : <VisibilityOff />}
  </IconButton>
)

class TextInput extends Component {
  state = {
    showPassword: false,
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render = () => {
    const {
      input: { name, ...restInput },
      meta,
      classes,
      type,
      ...rest
    } = this.props;
    const { showPassword } = this.state;
    return (
      <TextField
        {...rest}
        name={name}
        error={meta.error && meta.touched}
        InputProps={{
          endAdornment: <EndAdornment onClick={this.handleClickShowPassword} isVisible={showPassword} />,
          ...restInput
        }}
        className={classes.inpzut}
        type={showPassword ? "text" : type}
      />
    );
  }
};

export default withStyles(styles)(TextInput);