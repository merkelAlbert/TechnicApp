import React from 'react';
import EditIcon from '@material-ui/icons/Edit';

import Card from '../../../../../components/Card';
import CardContent from '../../../../../components/Card/CardContent';
import CardHeader from '../../../../../components/Card/CardHeader';
import CardContentArea from '../../../../../components/Card/CardContentArea';
import CardImage from '../../../../../components/Card/CardImage';
import CardActions from '../../../../../components/Card/CardActions';
import Link from '../../../../../components/Link';
import Switch from '../../../../../components/Switch';
import IconButton from '../../../../../components/IconButton';

import { IMAGES } from '../../../../../utils/api';

import './style.scss';
import Image from './technic.png';

const UserMachineCard = ({
  machine: { id, name, price, type, imageId },
  userId
}) => (
  <Card className="user-machine-card">
    <CardContent>
      <div className="user-machine-card__title">{name}</div>
      <div className="user-machine-card__subtitle">{type}</div>
    </CardContent>
    <Link to={`/user/${userId}/machines/${id}/view`}>
      {imageId ? (
        <CardImage
          image={`${IMAGES}${imageId}`}
          title={name}
          className="user-machine-card__image"
        />
      )
    : (
      <CardImage
          image={Image}
          title={name}
          className="user-machine-card__image"
        />
    )}
      <CardContentArea>
        <CardContent>
          <div className="user-machine-card__price">{price} ₽</div>
        </CardContent>{' '}
      </CardContentArea>
    </Link>
    <CardContent>
      <div className="user-machine-card__status">
        Статус машины: <Switch />
      </div>
    </CardContent>
    {/* <CardActions className="user-machine-card__actions">
      <IconButton>
        <EditIcon />
      </IconButton>
      <IconButton>
        <EditIcon />
      </IconButton>
    </CardActions> */}
  </Card>
);

export default UserMachineCard;
