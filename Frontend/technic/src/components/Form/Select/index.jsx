import cn from 'classnames';
import React from 'react';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import SelectField from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit
  }
});

const Select = ({ items, className, classes, onMutation, ...rest }) => (
  <Field
    {...rest}
    render={({
      input: { name, value, ...restInput },
      label,
      meta,
      required,
      ...rest
    }) => (
      <>
        <FormControl
          required={required}
          className={cn(classes.formControl, className)}
          error={meta.error && meta.touched}
        >
          <InputLabel>{label}</InputLabel>
          <SelectField
            value={value}
            inputProps={restInput}
            {...rest}
          >
            {items.map(item => (
              <MenuItem key={item.id} value={item.id}>
                {item.title}
              </MenuItem>
            ))}
            <OnChange name={name}>
              {value => {
                if (onMutation && value) {
                  onMutation(value);
                }
              }}
            </OnChange>
          </SelectField>
        </FormControl>
      </>
    )}
  />
);

export default withStyles(styles)(Select);
