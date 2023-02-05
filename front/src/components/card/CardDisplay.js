import React from 'react';
import {useSelector} from "react-redux";
import { Card, Image, Icon } from 'semantic-ui-react'

 export const CardDisplay=(props) =>{
    const item = useSelector(state=> state.cardReducer.value);
    return (
        <Card>
            <Image src={item.imgUrl} wrapped ui={false} />
            <Card.Content>
                <Card.Meta>
                    <ul>
                    <li >ID: {item.id}</li>
                    <li >Name: {item.name}</li>
                    <li >Description: {item.description}</li>
                    <li >Family: {item.family}</li>
                    <li >Affinity: {item.affinity}</li>
                    <li >Energy: {item.energy}</li>
                    <li >HP: {item.hp}</li>
                    <li>
                        <a>
                            <Icon name='money bill alternate outline' />
                                {item.price} $
                        </a>

                    </li>
                    

                    </ul>
                    
                    
                </Card.Meta>
            </Card.Content>
           
        </Card>

        );
    }
export default CardDisplay;