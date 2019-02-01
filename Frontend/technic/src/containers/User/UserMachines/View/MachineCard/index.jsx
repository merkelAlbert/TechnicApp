import React from 'react';

import Card from '../../../../../components/Card';
import CardContent from '../../../../../components/Card/CardContent';
import CardContentArea from '../../../../../components/Card/CardContentArea';
import CardImage from '../../../../../components/Card/CardImage';
import CardActions from '../../../../../components/Card/CardActions';
import Button from '../../../../../components/Button';

import './style.scss';
import Image from './technic.jpg';

const UserMachineCard = ({ name, description, type }) => {
  return (
    <Card className="user-machine-card">
      <CardContentArea>
        <CardImage  image={Image} title="traktor" className="user-machine-card__image"/>
        <CardContent>
          <div>{name}</div>
          <pre>{description}</pre>
          <div>{type}</div>
        </CardContent>
      </CardContentArea>
      <CardActions className="user-machine-card__actions">
        <Button>biba</Button>
      </CardActions>
    </Card>
  );
};

export default UserMachineCard;
