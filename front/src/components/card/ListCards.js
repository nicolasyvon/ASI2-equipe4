
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { updateCurrentCard } from '../../redux/actions';
import { API_USER } from "../../ressource/config";
import { useSelector } from 'react-redux';



export const ListCards= ( state={items:undefined} )=>{
  let dispatch=useDispatch();
  //const [cardListLength, setCardListLength] = useState(currentUser.cardList.length);
  let currentUser=useSelector(state=>state.userReducer.user);

  function handleclick(item) {
    console.log('card clicked.', item);
    dispatch(updateCurrentCard(item));
  
  }
  
  
  const [cards, setCards] = useState([]);
  const fetchData = () => {
    fetch(API_USER+"/cards_to_sell")
       .then(response => {
           return response.json()
         })
        .then(data => {
          setCards(data)
         })
     }
     useEffect(() => {
          fetchData()
        }, [currentUser.cardList]) 

       /* useEffect(() => {
          if (currentUser.cardList.length !== cardListLength) {
            setCardListLength(currentUser.cardList.length);
            fetchData();
          }
        }, []);*/
  
  return (
    <div>
      <br/>
    <h2>Market</h2>
    <table class="table table-hover table-bordered ">
                        <thead class="table-info">
                        <tr>
                        <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Family</th>
                            <th scope="col">Affinity</th>
                            <th scope="col">Energy</th>
                            <th scope="col">HP</th>
                            <th scope="col">Price</th>
                            <th scope="col">ID</th>
                          </tr>
                          </thead>
              
    {
                cards.map((item) => ( 
               
                        
                        <tbody>
                          <tr key = { item.id }onClick={() =>handleclick(item)} >
                          <td >{ item.name }</td>
                            <td >{ item.description }</td>
                            <td>{ item.family }</td>
                            <td>{ item.affinity }</td>
                            <td>{ item.energy }</td>
                            <td>{ item.hp }</td>
                            <td>{ item.price }</td>
                            <td>{ item.id }</td>
                          </tr>
                        </tbody>           
                ))
            }
                      </table>

    </div>
    
    );
}

