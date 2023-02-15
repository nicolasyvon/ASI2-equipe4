import React from 'react';
import {useSelector} from "react-redux";
import { Card, Image, Icon } from 'semantic-ui-react'

 export const CardRowView=(props) =>{
    return (
        <Card>
            <Image src={props.card.imgUrl} wrapped ui={false} />
            <Card.Content>
                <Card.Meta>
                    <ul style={{listStyleType: 'none', padding: 0, margin: 0}}>
                    <li >Name: {props.card.name} </li>
                    <li >Family: {props.card.family}</li>
                    <li >Attack: {props.card.attack}</li>
                    <li >
                    <a><Icon name='protect'/></a>  Defense: {props.card.defence} </li>
                    <li >
                        <a><Icon name='battery three quarters Energy'/></a>  Energy: {props.card.energy}</li>
                    <li >
                        <a><Icon name='heart' /></a> HP: {props.card.hp}

                    </li>
                    

                    </ul>
                    
                    
                </Card.Meta>
            </Card.Content>
           
        </Card>

        );
    }
export default CardRowView;