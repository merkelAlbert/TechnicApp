import cn from 'classnames';
import React, { Component } from 'react';

import Card from '../../../../../components/Card';
import CardContent from '../../../../../components/Card/CardContent';
import CardHeader from '../../../../../components/Card/CardHeader';
import CardContentArea from '../../../../../components/Card/CardContentArea';
import CardImage from '../../../../../components/Card/CardImage';
import Link from '../../../../../components/Link';
import Menu from '../../../../../components/Menu';
import MenuItem from '../../../../../components/Menu/MenuItem';

import { FILES } from '../../../../../utils/api';

import './style.scss';
import Image from './technic.png';
import machineStatuses from '../../../../../constants/machineStatuses';

class UserMachineCard extends Component {
  state = {
    anchorEl: null
  };

  onCardActionClick = e => {
    const { currentTarget } = e;
    this.setState({
      anchorEl: currentTarget
    });
  };

  handleCardMenuClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  render = () => {
    const {
      machine: { id: machineId, name, price, type, imageId, status },
      userId
    } = this.props;
    const { anchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);

    return (
      <Card
        className={cn(
          'user-machine-card',
          {
            'user-machine-card--hidden': status === machineStatuses.hidden.id
          },
          {
            'user-machine-card--active': status === machineStatuses.active.id
          },
          {
            'user-machine-card--busy': status === machineStatuses.busy.id
          }
        )}
      >
        <CardHeader
          title={name}
          titleSize="medium"
          subTitle={type}
          onActionClick={this.onCardActionClick}
        />
        <Menu
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={this.handleCardMenuClose}
        >
          <Link to={`/user/${userId}/machines/edit/${machineId}`}>
            <MenuItem>Изменить</MenuItem>
          </Link>
          <Link to={`/user/${userId}/machines/remove/${machineId}`}>
            <MenuItem>Удалить</MenuItem>
          </Link>
        </Menu>
        <Link to={`/user/${userId}/machines/view/${machineId}`}>
          {imageId ? (
            <CardImage
              image={`${FILES}/${imageId}`}
              title={name}
              className="user-machine-card__image"
            />
          ) : (
            <CardImage
              image={Image}
              title={name}
              className="user-machine-card__image"
            />
          )}
          <CardContentArea>
            <CardContent>
              <div className="user-machine-card__price">{price} ₽</div>
            </CardContent>
          </CardContentArea>
        </Link>
      </Card>
    );
  };
}

export default UserMachineCard;
