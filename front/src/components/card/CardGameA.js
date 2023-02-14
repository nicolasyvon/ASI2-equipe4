import React from 'react';
import {useSelector} from "react-redux";
import { Card, Image, Icon } from 'semantic-ui-react'

 export const CardGameA=(props) =>{
    const cardPlayer1 = useSelector(state => state.gameReducer.player1_selectedCard);
    return (
        <Card>
  {cardPlayer1 && <Image src={cardPlayer1.imgUrl} wrapped ui={false} />}
  <Card.Content>
    {cardPlayer1 ? (
      <Card.Meta>
        <ul style={{listStyleType: 'none', padding: 0, margin: 0}}>
          <li>Name: {cardPlayer1.name}</li>
          <li>Family: {cardPlayer1.family}</li>
          <li>Attack: {cardPlayer1.attack}</li>
          <li>
            <a><Icon name='protect'/></a> Defense: {cardPlayer1.defence}
          </li>
          <li>
            <a><Icon name='battery three quarters Energy'/></a> Energy: {cardPlayer1.energy}
          </li>
          <li>
            <a><Icon name='heart' /></a> HP: {cardPlayer1.hp}
          </li>
        </ul>
      </Card.Meta>
    ) : (
      <Card.Meta>No card selected</Card.Meta>
    )}
  </Card.Content>
</Card>
    );
    
    }
export default CardGameA;