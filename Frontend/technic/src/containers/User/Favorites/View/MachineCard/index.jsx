import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  AssignmentTurnedInOutlined,
  Star,
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

const UserFavoriteCard = ({
  machine: { id: machineId, name, price, type, imageId },
  user,
  deleteFromFavorite
}) => {
  return (
    <Card className="user-favorites-card">
      <CardHeader title={name} titleSize="medium" subTitle={type} />
      <Link to={`/user/${user.id}/favoritemachines/view/${machineId}`}>
        {imageId ? (
          <CardImage
            image={`${FILES}/${imageId}`}
            title={name}
            className="user-favorites-card__image"
          />
        ) : (
          <CardImage
            image={Image}
            title={name}
            className="user-favorites-card__image"
          />
        )}
        <CardContentArea>
          <CardContent>
            <div className="user-favorites-card__price">{price} ₽</div>
          </CardContent>
        </CardContentArea>
      </Link>
      {user.role === userRoles.person.id && (
        <CardActions className="user-favorites-card__actions">
          <IconButton onClick={() => deleteFromFavorite(machineId)}>
            <Star className="user-favorites-card__favorite-icon" />
          </IconButton>
          <IconButton>
            <AssignmentTurnedInOutlined className="user-favorites-card__order-icon" />
          </IconButton>
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
    deleteFromFavorite: async machineId => {
      try {
        await dispatch(update(machineId, { isFavorite: false }));
        onSuccess('Удалено из избранного');
      } catch (err) {
        console.log(err);
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFavoriteCard);
