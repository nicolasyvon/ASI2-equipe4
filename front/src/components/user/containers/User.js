import React from 'react';
import UserShortDisplay from '../components/UserShortDispalay';
import CardDisplay from '../../card/CardDisplay';


const FULL_LABEL='FULL';
const SHORT_LABEL='SHORT';

export const User=(props)=> {
    let display="";
    switch(props.display_type){
        case SHORT_LABEL:
            display = (                
               <UserShortDisplay
                    surname = {props.surname}
                    lastname = {props.lastname}
                    img = {props.img}
                    money = {props.money}> 
                </UserShortDisplay>
            )

            break;
        case FULL_LABEL:
            display=(                
                <CardDisplay
                    id = {props.id}
                    surname = {props.surname}
                    lastname = {props.lastname}
                    login = {props.login}
                    pwd = {props.pwd}
                    money = {props.money}
                    img = {props.img}> 
                </CardDisplay>
            );
            break;
        default:
            display=(<h4>No Display Available</h4>);
    }
        return display;
    }
export default User;