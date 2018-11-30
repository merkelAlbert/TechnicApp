import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SelectField from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel'
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
  },
});

class Select extends Component {
  state = {
    value: 0,
  }

  componentDidMount = () => {
    const { items } = this.props;
    this.setState({
      value: items[0].id,
    });
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render = () => {
    const {
      items,
      input: { name, ...restInput },
      meta,
      label,
      required,
      className,
      classes,
      ...rest
    } = this.props;
    return (
      <FormControl
        required={required}
        className={cn(classes.formControl, className)}
        error={meta.error && meta.touched}
      >
        <InputLabel>{label}</InputLabel>
        <SelectField
          onChange={this.handleChange}
          value={this.state.value}
          name={name}
          inputProps={restInput}
          {...rest}
        >
          {
            items.map(item => <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
          }
        </SelectField>
      </FormControl>
    );
  }
}

export default withStyles(styles)(Select);
