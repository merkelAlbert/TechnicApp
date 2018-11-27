import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import cn from 'classnames';
import Text from '@material-ui/core/TextField';

const styles = theme => ({
  input: {
    margin: theme.spacing.unit,
  },
});

const TextField = ({
  input: { name, ...restInput },
  meta,
  classes,
  className,
  ...rest
}) => (
    <Text
      {...rest}
      name={name}
      error={meta.error && meta.touched}
      InputProps={restInput}
      className={cn(classes.input, className)}
    />
  );

TextField.defaultProps = {
  className: null,
};

TextField.propTypes = {
  className: PropTypes.string,
};

export default withStyles(styles)(TextField);