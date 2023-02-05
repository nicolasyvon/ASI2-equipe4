import React from 'react';
import {useSelector} from "react-redux";
import { Card, Image, Icon } from 'semantic-ui-react'

 export const CardPlayer2=(props) =>{
    const item = useSelector(state=> state.cardPlayer2Reducer.value);
    return (
        <Card>
            <Image src="/images/smiley.jpg" wrapped ui={false} />
            <Card.Content>
                <Card.Meta>
                    <ul>
                    <li >Name: {item.name} </li>
                    <li >Description: {item.description}  </li>
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
export default CardPlayer2;