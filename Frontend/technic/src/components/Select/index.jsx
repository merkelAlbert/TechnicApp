import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import SelectField from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  formControl: {}
});

const Select = ({
  items,
  required,
  label,
  value,
  onChange,
  className,
  classes
}) => {
  return (
    <>
      <FormControl
        required={required}
        className={cn(classes.formControl, className)}
      >
        {label && <InputLabel>{label}</InputLabel>}
        <SelectField value={value} onChange={onChange}>
          {items.map(item => (
            <MenuItem key={item.id} value={item.id} disabled={item.disabled}>
              {item.title}
            </MenuItem>
          ))}
        </SelectField>
      </FormControl>
    </>
  );
};

export default withStyles(styles)(Select);
