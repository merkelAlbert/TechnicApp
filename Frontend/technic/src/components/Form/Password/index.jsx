import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import cn from 'classnames';
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
      className,
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
        className={cn(classes.input, className)}
        type={showPassword ? "text" : type}
      />
    );
  }
};

export default withStyles(styles)(TextInput);