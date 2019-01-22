import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Field } from 'react-final-form';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
const styles = theme => ({
  input: {
    margin: theme.spacing.unit
  }
});

const Text = ({ classes, className, multiline, ...restProps }) => (
  <Field
    {...restProps}
    render={({ input: { name, ...restInput }, meta, ...rest }) => (
      <TextField
        {...rest}
        name={name}
        error={meta.error && meta.touched}
        multiline={multiline}
        InputProps={restInput}
        className={cn(classes.input, className)}
      />
    )}
  />
);

Text.defaultProps = {
  className: null
};

Text.propTypes = {
  className: PropTypes.string
};

export default withStyles(styles)(Text);
