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

class HomeMachineCard extends Component {
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
      machine: { id: machineId, name, price, type, imageId },
    } = this.props;
    const { anchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);

    return (
      <Card className="home-machine-card">
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
          {/* <Link to={`/home/${homeId}/machines/edit/${machineId}`}>
            <MenuItem>Изменить</MenuItem>
          </Link>
          <Link to={`/home/${homeId}/machines/remove/${machineId}`}>
            <MenuItem>Удалить</MenuItem>
          </Link> */}
        </Menu>
        <Link to={`/machines/view/${machineId}`}>
          {imageId ? (
            <CardImage
              image={`${FILES}/${imageId}`}
              title={name}
              className="home-machine-card__image"
            />
          ) : (
            <CardImage
              image={Image}
              title={name}
              className="home-machine-card__image"
            />
          )}
          <CardContentArea>
            <CardContent>
              <div className="home-machine-card__price">{price} ₽</div>
            </CardContent>
          </CardContentArea>
        </Link>
      </Card>
    );
  };
}

export default HomeMachineCard;
