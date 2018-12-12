import React, { Component } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import withStyles from '@material-ui/core/styles/withStyles';
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
);

EndAdornment.propTypes = {
  onClick: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

class Password extends Component {
  state = {
    showPassword: false,
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render = () => {
    const {
      classes,
      className,
      ...rest
    } = this.props;
    const { showPassword } = this.state;

    return (
    <Field
      {...rest}
      render={({
        input: { name, ...restInput },
        meta,
        type,
        ...rest
      }) => (
          <TextField
            {...rest}
            name={name}
            error={meta.error && meta.touched}
            InputProps={{
              endAdornment: <EndAdornment onClick={this.handleClickShowPassword} isVisible={showPassword} />,
              ...restInput
            }}
            className={cn(classes.input, className)}
            type={showPassword ? 'text' : type}
          />
        )}
      />
    );
  }
};

Password.defaultProps = {
  type: 'password',
  className: null,
};

Password.proptypes = {
  type: PropTypes.string,
  className: PropTypes.string,
};

export default withStyles(styles)(Password);