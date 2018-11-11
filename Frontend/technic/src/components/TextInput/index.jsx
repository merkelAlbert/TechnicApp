import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const styles = theme => ({
  input: {
    margin: theme.spacing.unit,
  },
});

class TextInput extends Component {
  state = {
    showPassword: false,
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render = () => {
    const { placeholder, type, classes, ...restProps } = this.props;
    return (
      <Input
        {...restProps}
        placeholder={placeholder}
        type={type === "password" && this.state.showPassword ? 'text' : 'password'}
        className={classes.input}
        endAdornment={
          type === "password"
          && <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onClick={this.handleClickShowPassword}
            >
              {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    );
  }
};

export default withStyles(styles)(TextInput);