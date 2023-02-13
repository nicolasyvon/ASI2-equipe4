import React, { useState } from 'react';
import { Grid, Segment,Menu } from 'semantic-ui-react';
import { User } from '../../components/user/containers/User';
import {ListCards} from '../../components/card/ListCards';
import { useSelector } from 'react-redux';
import "./Buy.css";
import { API_USER } from "../../ressource/config";
import { useNavigate } from "react-router-dom";
import {updateUser} from '../../redux/actions/index';
import {  useDispatch } from 'react-redux';

//Create function component
export const Buy =(props) =>{
    const cardItem = useSelector(state=> state.cardReducer.value);
    let currentUser=useSelector(state=>state.userReducer.user);
    const [money, setMoney] = useState(currentUser.money);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /*const [currentUser,setCurrentUser]= useState({
                                        id:12,
                                        surname:"John",
                                        lastname:"Doe",
                                        login:"jDoe",
                                        pwd:"jdoepwd",
                                        img:'https://i.pinimg.com/474x/9f/4b/6f/9f4b6ff027c0a45da65081efee6bdd36.jpg',
                                        money:1000,
                                      });*/
    /* function callbackErr(data){
        console.log(data);
    };*/

    /*function handleChange(data){
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
    };*/

    /*function submitUserHandler(data){
      console.log("user to submit"+data);
    };*/
   

    function buyCard(){
        let jsonData = { 
        user_id: currentUser.id, 
        card_id: cardItem.id,
        }
        console.log("button BUY clicked")
        fetch(API_USER + "store/buy", { 
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
              setMoney(data.money);
              dispatch(updateUser(data));
              alert("Achat bien effectué !")
            });
        })
        .catch(error => console.error(error));
      /*async function getUser(id) {
        const response = await fetch(API_USER + "user/" + (id));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Transaction d'achat terminée");
        dispatch(updateUser(data));
        navigate("/");
        }*/
        
        }

       
       
    return (
      <div className='BuyCard'>
        <Menu>
          <Menu.Item
            name='heropres'>
            Buy Cards
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
              <button onClick={buyCard}>Buy</button>
          </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
}

//export default App;

