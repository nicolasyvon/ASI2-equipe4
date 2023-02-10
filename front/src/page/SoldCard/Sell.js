import React, { useState } from 'react';
import { Grid, Segment,Menu } from 'semantic-ui-react';
import { User } from '../../components/user/containers/User';
import { ListCardsToSell } from '../../components/card/ListCardsToSell';
import { useSelector } from 'react-redux';
import "./Sell.css";
import { API_USER } from "../../ressource/config";
import {  useDispatch } from 'react-redux';
import {updateUser} from '../../redux/actions/index';



//Create function component
export const Sell =(props) =>{
  const item = useSelector(state=> state.cardReducer.value);
  let currentUser=useSelector(state=>state.userReducer.user);
  const dispatch = useDispatch();

    /*const [currentUser,setCurrentUser]= useState({
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
    };*/

    function sellCard(){
      let jsonData = { 
      user_id: currentUser.id, 
      card_id: item.id,
      
      }
      console.log("button SELL clicked",jsonData)
      fetch(API_USER + "store/sell", { 
      headers: {
      //'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      method: 'POST', 
      body: JSON.stringify(jsonData) 
      
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        console.log("Transaction success!");
        fetch(API_USER + "user/" + currentUser.id)
          .then(res => {
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
          })
          .then(data => {
            dispatch(updateUser(data));
            alert("Vente bien effectuée !")
          });
      })
      .catch(error => console.error(error));
      } 
      
        
      


    return (
      <div className='SoldCard'>
        <Menu>
          <Menu.Item
            name='heropres'>
            Sell Cards
          </Menu.Item>
          <Menu.Item
            name='heropres'>
            Home
          </Menu.Item>
        </Menu>
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
          <Grid.Column>
            <Segment>
              <ListCardsToSell>

              </ListCardsToSell>

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

