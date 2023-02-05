import React, { useState } from 'react';
import { Grid, Segment,Menu } from 'semantic-ui-react';
import { User } from '../../components/user/containers/User';
import {ListCards} from '../../components/card/ListCards';
import { useSelector } from 'react-redux';
import "./Sell.css";
import { API_USER } from "../../ressource/config";



//Create function component
export const Sell =(props) =>{
  const item = useSelector(state=> state.cardReducer.value);
  let currentUserId=useSelector(state=>state.userReducer.user_id);

    const [currentUser,setCurrentUser]= useState({
                                        id:12,
                                        surname:"John",
                                        lastname:"Doe",
                                        login:"jDoe",
                                        pwd:"jdoepwd",
                                        img:'https://i.pinimg.com/474x/9f/4b/6f/9f4b6ff027c0a45da65081efee6bdd36.jpg',
                                        money:1000,
                                      });
     function callbackErr(data){
        console.log(data);
    };

    function handleChange(data){
      console.log(data);
      setCurrentUser({
        id:data.id,
        surname:data.surname,
        lastname:data.lastname,
        login:data.login,
        pwd:data.pwd,
        money:data.money,
        img:data.img,
      });
    };

    function submitUserHandler(data){
      console.log("user to submit"+data);
    };

    function sellCard(){
      let jsonData = { 
      user_id: parseInt(currentUserId), 
      card_id: item.id,
      
      }
      console.log("button clicked",jsonData)
      // Send data to the backend via POST
      fetch(API_USER+'store/sell', { // Enter your IP address here
     
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      method: 'POST', 
      body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
      
      })
      console.log(jsonData)
      }

    return (
      <div className='SoldCard'>
        <Menu>
          <Menu.Item
            name='heropres'>
            Sell Cards
          </Menu.Item>
        </Menu>
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
          <Grid.Column>
            <Segment>
              <ListCards>

              </ListCards>

            </Segment>
          </Grid.Column>
          <Grid.Column>
              <User 
                     id={currentUser.id}
                      surname={currentUser.surname}
                      lastname={currentUser.lastname}
                      login={currentUser.login}
                      pwd={currentUser.pwd}
                      money={currentUser.money}
                      img={currentUser.img}
                      display_type='FULL'>
              </User>
              <button onClick={sellCard}>Sell</button>
          </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
}

//export default App;

