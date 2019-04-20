import cn from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  AssignmentTurnedInOutlined,
  Star,
  StarBorder
} from '@material-ui/icons';

import Card from '../../../../../components/Card';
import CardContent from '../../../../../components/Card/CardContent';
import CardHeader from '../../../../../components/Card/CardHeader';
import CardContentArea from '../../../../../components/Card/CardContentArea';
import CardActions from '../../../../../components/Card/CardActions';
import CardImage from '../../../../../components/Card/CardImage';
import Link from '../../../../../components/Link';
import IconButton from '../../../../../components/IconButton';
import Menu from '../../../../../components/Menu';
import MenuItem from '../../../../../components/Menu/MenuItem';

import { FILES } from '../../../../../utils/api';
import { update } from '../../../../../store/actions/machines';

import userRoles from '../../../../../constants/roles';
import machineStatuses from '../../../../../constants/machineStatuses';

import './style.scss';
import Image from './technic.png';

class CommonMachinesCard extends Component {
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
      machine: {
        id: machineId,
        name,
        price,
        type,
        imageId,
        status,
        isFavorite
      },
      startUrl,
      isPrivateOffice,
      user,
      switchIsFavorite
    } = this.props;
    const { anchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);

    return (
      <Card
        className={cn(
          'common-machines-card',
          {
            'common-machines-card--hidden':
              isPrivateOffice &&
              user.role === userRoles.company.id &&
              status === machineStatuses.hidden.id
          },
          {
            'common-machines-card--active':
              isPrivateOffice &&
              user.role === userRoles.company.id &&
              status === machineStatuses.active.id
          },
          {
            'common-machines-card--busy':
              isPrivateOffice &&
              user.role === userRoles.company.id &&
              status === machineStatuses.busy.id
          }
        )}
      >
        <CardHeader
          title={name}
          titleSize="medium"
          subTitle={type}
          onActionClick={
            user.role === userRoles.company.id && this.onCardActionClick
          }
        />
        {user.role === userRoles.company.id && (
          <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={this.handleCardMenuClose}
          >
            <Link to={`${startUrl}/edit/${machineId}`}>
              <MenuItem>Изменить</MenuItem>
            </Link>
            <Link to={`${startUrl}/remove/${machineId}`}>
              <MenuItem>Удалить</MenuItem>
            </Link>
          </Menu>
        )}
        <Link to={`${startUrl}/view/${machineId}`}>
          {imageId ? (
            <CardImage
              image={`${FILES}/${imageId}`}
              title={name}
              className="common-machines-card__image"
            />
          ) : (
            <CardImage
              image={Image}
              title={name}
              className="common-machines-card__image"
            />
          )}
          <CardContentArea>
            <CardContent>
              <div className="common-machines-card__price">{price} ₽</div>
            </CardContent>
          </CardContentArea>
        </Link>
        {user.role === userRoles.person.id && (
          <CardActions className="common-machines-card__actions">
            <IconButton onClick={() => switchIsFavorite(machineId, isFavorite)}>
              {!isFavorite ? (
                <StarBorder className="common-machines-card__favorite-icon" />
              ) : (
                <Star className="common-machines-card__favorite-icon" />
              )}
            </IconButton>
            <Link to={`${startUrl}/addorder/${machineId}`}>
              <IconButton>
                <AssignmentTurnedInOutlined className="common-machines-card__order-icon" />
              </IconButton>
            </Link>
          </CardActions>
        )}
      </Card>
    );
  };
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const { onSuccess } = ownProps;

  return {
    switchIsFavorite: async (machineId, isFavorite) => {
      try {
        await dispatch(update(machineId, { isFavorite: !isFavorite }));
        !isFavorite
          ? onSuccess('Добавлено в избранное')
          : onSuccess('Удалено из избранного');
      } catch (err) {
        console.log(err);
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommonMachinesCard);
