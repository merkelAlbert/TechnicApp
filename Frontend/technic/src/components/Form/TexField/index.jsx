import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

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
  ...rest }) => (
  <TextField
    {...rest}
    name={name}
    error={meta.error && meta.touched}
    InputProps={restInput}
    className={classes.input}
  />
);

export default withStyles(styles)(TextInput);