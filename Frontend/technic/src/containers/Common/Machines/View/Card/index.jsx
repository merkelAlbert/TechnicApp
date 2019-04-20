import React from 'react';
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

import { FILES } from '../../../../../utils/api';
import { update } from '../../../../../store/actions/machines';

import userRoles from '../../../../../constants/roles';

import './style.scss';
import Image from './technic.png';

const CommonMachinesCard = ({
  machine: { id: machineId, name, price, type, imageId, isFavorite },
  startUrl,
  user,
  switchIsFavorite
}) => {
  return (
    <Card className="common-machines-card">
      <CardHeader title={name} titleSize="medium" subTitle={type} />
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
