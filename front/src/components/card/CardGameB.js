import React from 'react';
import {useSelector} from "react-redux";
import { Card, Image, Icon } from 'semantic-ui-react'

 export const CardGameB=(props) =>{
    const cardPlayer2 = useSelector(state => state.gameReducer.player2_selectedCard);
    return (
        <Card>
  {cardPlayer2 && <Image src={cardPlayer2.imgUrl} wrapped ui={false} />}
  <Card.Content>
    {cardPlayer2 ? (
      <Card.Meta>
        <ul style={{listStyleType: 'none', padding: 0, margin: 0}}>
          <li>Name: {cardPlayer2.name}</li>
          <li>Family: {cardPlayer2.family}</li>
          <li>Attack: {cardPlayer2.attack}</li>
          <li>
            <a><Icon name='protect'/></a> Defense: {cardPlayer2.defence}
          </li>
          <li>
            <a><Icon name='battery three quarters Energy'/></a> Energy: {cardPlayer2.energy}
          </li>
          <li>
            <a><Icon name='heart' /></a> HP: {cardPlayer2.hp}
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
export default CardGameB;