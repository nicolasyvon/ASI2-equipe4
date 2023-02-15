import CardDisplay from "../card/CardDisplay"
import CardGameA from "../card/CardGameA";
import CardGameB from "../card/CardGameB";
import React, { useState,useContext,useEffect } from "react";
import { API_USER } from "../../ressource/config";
import { useSelector } from 'react-redux';
import CardRowView from "../card/CardRowView";
import { setPercentPlayer1, setPercentPlayer2, updateU1SelectedCard, updateU2SelectedCard } from "../../redux/actions";
import {  useDispatch } from 'react-redux';

export const GameField = () => {

        let p1 = useSelector(state=>state.gameReducer.player1);
        let p2 = useSelector(state=>state.gameReducer.player2);  
        let p1CardSelected = useSelector(state=>state.gameReducer.player1_selectedCard);
        let p2CardSelected = useSelector(state=>state.gameReducer.player2_selectedCard);      
        let currentUser = useSelector(state=>state.userReducer.user); 
        const percentPlayer1 = useSelector(state => state.gameReducer.percentPlayer1);
        const percentPlayer2 = useSelector(state => state.gameReducer.percentPlayer2);

        const [player1SelectedCard, setPlayer1SelectedCard] = useState(null);
        const [player2SelectedCard, setPlayer2SelectedCard] = useState(null);


        const [player1, setPlayer1] = useState(currentUser);
        const [player2, setPlayer2] = useState(currentUser);
        const [player1Cards, setPlayer1Cards] = useState([]);
        const [player2Cards, setPlayer2Cards] = useState([]);

        const dispatch = useDispatch();

        function handleCardAclick(card) {
                console.log('card A clicked.', card.id);
                dispatch(updateU1SelectedCard(card));  
                setPlayer1SelectedCard(card);
              }

        function handleCardBclick(card) {
                console.log('card B clicked.', card.id);
                dispatch(updateU2SelectedCard(card));    
                setPlayer2SelectedCard(card);    
        }

        function handlePercentPlayer1Change(newPercentValue) {
                dispatch(setPercentPlayer1(newPercentValue));
              }

        function handlePercentPlayer2Change(newPercentValue) {
        dispatch(setPercentPlayer2(newPercentValue));
        }

        function attack(){
                
        }

        const fetchData = () => {
                fetch(API_USER+"cards")
                   .then(response => {
                       return response.json()
                     })
                     .then((data) => {
                        const user1Cards = data.filter(card => player1.cardList.includes(card.id));
                        const user2Cards = data.filter(card => player2.cardList.includes(card.id));
                        setPlayer1Cards(user1Cards);
                        setPlayer2Cards(user2Cards);
                      });
                 }

        fetchData()

    return (
        <div class="ui segment" style={{height:'1300px', width:'1000px'}}>
        <div class="ui grid">
            <div class="four wide column">
                    <div id="chatContent"></div> 
            </div>
            <div class="twelve wide column">
                        <div class="row">
                                <div class="ui grid">
                                        <div class="two wide column">
                                                <div class="ui one  column grid">    
                                                        <div class="row">                   
                                                                <div class="column"> <i class="user circle huge icon "></i></div>
                                                        </div>
                                                        <div class="row">
                                                                <div class=" column">Player A</div>      
                                                         </div>     
                                                         
                                                         <div class="row">
                                                                        <div class="column">
                                                                                <div class="ui teal progress" data-percent={percentPlayer1} id="progressBarId1" >
                                                                                    <div class="bar"></div>     
                                                                                    <div class="label">Action Points</div>                                                                                   
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                </div>
                                        </div>
                                        <div class="ten wide column">
                                                <div class="ui four column grid">
                                                {
                                                        player1Cards.map((item) => ( 
                                                                <div class="column" key={item.id}>
                                                                <div class="shortCardA" onClick={() =>handleCardAclick(item)}>
                                                                <CardRowView card={item}></CardRowView></div> 
                                                                </div>          
                                                           
                                                        ))
                                                        }
                                                        
                                                </div>
                                        </div>
                                        <div class="four wide column">
                                                <div id="fullCardA1">Player 1 Selected Card<br/>
                                                <CardGameA card={p1CardSelected}></CardGameA></div> 
                                        </div>
                                </div>
                        </div>

                        <div class="row">
                                <div class="ui grid ">
                                        <div class="twelve wide column">
                                                <h4 class="ui horizontal divider header">
                                                                VS
                                                </h4>                                                        
                                        </div>
                                        <div class="four wide column">
                                                <button 
                                                class="huge ui primary button"
                                                onClick={attack}
                                                >
                                                                Attack
                                                </button>
                                        </div>
                                </div>
                        </div>


                        <div class="row">
                                        <div class="ui grid">
                                                <div class="two wide column">
                                                        <div class="ui one  column grid">    
                                                                <div class="row">                   
                                                                        <div class="column"> <i class="user circle huge icon "></i></div>
                                                                </div>    
                                                                <div class="row">
                                                                        <div class=" column">Player B</div>      
                                                                 </div>     
                                                                 <div class="row">
                                                                        <div class="column">
                                                                                <div class="ui teal progress" data-percent={percentPlayer2} id="progressBarId2" >
                                                                                    <div class="bar"></div>     
                                                                                    <div class="label">Action Points</div>                                                                                   
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                                     
                                                                 
                                                        </div>
                                                </div>
                                                <div class="ten wide column">
                                                        <div class="ui four column grid">
                                                        {
                                                                player2Cards.map((item) => ( 
                                                                        <div class="column">
                                                                        <div class="shortCardB" onClick={() =>handleCardBclick(item)}>
                                                                        <CardRowView card={item} ></CardRowView></div> 
                                                                        </div>                                                                     
                                                                ))
                                                                }
                                                        
                                                        </div>
                                                                
                                                        
                                                </div>
                                                <div class="four wide column">
                                                        <div id="fullCardB1">Player 2 Selected Card<br/>
                                                                <CardGameB card={p2CardSelected}></CardGameB></div> 
                                                </div>
                                        </div>
                                </div>





                </div> 
        </div>
</div>
    );
  };