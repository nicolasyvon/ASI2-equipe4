import React from 'react';
import {useSelector} from "react-redux";
import { Card, Image, Icon } from 'semantic-ui-react'

 export const CardGame=(props) =>{
    const item = useSelector(state=> state.cardReducer.value);
    return (
        <Card>
            <Image src={item.imgUrl} wrapped ui={false} />
            <Card.Content>
                <Card.Meta>
                    <ul style={{listStyleType: 'none', padding: 0, margin: 0}}>
                    <li >Name: {item.name} </li>
                    <li >Attack: {item.attack}</li>
                    <li >
                    <a><Icon name='protect'/></a>  Defense: {item.defence} </li>
                    <li >
                        <a><Icon name='battery three quarters Energy'/></a>  Energy: {item.energy}</li>
                    <li >
                        <a><Icon name='heart' /></a> HP: {item.hp}

                    </li>
                    

                    </ul>
                    
                    
                </Card.Meta>
            </Card.Content>
           
        </Card>

        );
    }
export default CardGame;