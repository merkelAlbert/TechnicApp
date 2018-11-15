import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import cn from 'classnames';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  input: {
    margin: theme.spacing.unit,
  },
});

const TextInput = ({
  input: { name, ...restInput },
  meta,
  classes,
  className,
  ...rest }) => (
    <TextField
      {...rest}
      name={name}
      error={meta.error && meta.touched}
      InputProps={restInput}
      className={cn(classes.input, className)}
    />
  );

export default withStyles(styles)(TextInput);