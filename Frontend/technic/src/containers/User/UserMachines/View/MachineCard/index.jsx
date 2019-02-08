import React from 'react';

import Card from '../../../../../components/Card';
import CardContent from '../../../../../components/Card/CardContent';
import CardContentArea from '../../../../../components/Card/CardContentArea';
import CardImage from '../../../../../components/Card/CardImage';
import CardActions from '../../../../../components/Card/CardActions';
import Button from '../../../../../components/Button';
import Link from '../../../../../components/Link';
import Switch from '../../../../../components/Switch';

import './style.scss';
import Image from './technic.jpg';

const UserMachineCard = ({ machine: { id, name, price, type }, userId }) => (
  <Card className="user-machine-card">
    <CardContentArea>
      <Link to={`/user/${userId}/machines/${id}/view`}>
        <CardImage
          image={Image}
          title="traktor"
          className="user-machine-card__image"
        />
        <CardContent>
          <div>{name}</div>
          <div>{price} ₽</div>
          <div>{type}</div>
        </CardContent>
      </Link>
    </CardContentArea>
    <div>
      Статус: <Switch />
    </div>
    <CardActions className="user-machine-card__actions">
      <Button color="secondary">biba</Button>
      <Button>boba</Button>
      <Button>2 dolboeba</Button>
    </CardActions>
  </Card>
);

export default UserMachineCard;
