import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


class TabBar extends Component {
  state = {
    value: 0,
  };

  handleClick = (index) => {
    this.setState({ value: index });
  };

  render = () => {
    const {
      values,
      className,
      children,
      textColor,
      indicatorColor,
      ...props
    } = this.props;

    const { value } = this.state;

    return (
      <div className={className}>
        <Tabs
          indicatorColor={indicatorColor}
          textColor={textColor}
          {...props}
          value={value}
        >
          {
            values.map((value, index) => (
              <Tab
                key={value}
                onClick={() => this.handleClick(index)}
                label={value}
              />
            ))
          }
        </Tabs>
        {children[value]}
      </div>
    );
  };
};

TabBar.defaultProps = {
  className: null,
  textColor: 'primary',
  indicatorColor: 'primary',
};

TabBar.propTypes = {
  className: PropTypes.string,
  textColor: PropTypes.string,
  indicatorColor: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
}

export default TabBar;