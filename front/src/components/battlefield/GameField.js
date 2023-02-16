import CardDisplay from "../card/CardDisplay"
import CardGameA from "../card/CardGameA";
import CardGameB from "../card/CardGameB";
import React, { useState,useContext,useEffect } from "react";
import { API_USER } from "../../ressource/config";
import { useSelector } from 'react-redux';
import CardRowView from "../card/CardRowView";
import { setPercentPlayer1, setPercentPlayer2, updateU1SelectedCard, updateU2SelectedCard, setPlayer1, setPlayer2, updateCardsPlayer1, updateCardsPlayer2 } from "../../redux/actions";
import {  useDispatch } from 'react-redux';
import { SocketContext } from "../../ressource/socket";
import { API_GAME } from "../../ressource/config";
import { useNavigate } from "react-router-dom";

export const GameField = () => {

        let socket = useContext(SocketContext);
        let gameName = useSelector(state=>state.gameReducer.roomName);

        const navigate = useNavigate();

        let currentUser = useSelector(state=>state.userReducer.user);  

        let p1 = useSelector(state=>state.gameReducer.player1); 
        let p2 = useSelector(state=>state.gameReducer.player2);

        let player1Cards = useSelector(state=>state.gameReducer.cardsPlayer1);
        let player2Cards = useSelector(state=>state.gameReducer.cardsPlayer2);
        
        let p1CardSelected = useSelector(state=>state.gameReducer.player1_selectedCard);
        let p2CardSelected = useSelector(state=>state.gameReducer.player2_selectedCard);   
           

        const percentPlayer1 = useSelector(state => state.gameReducer.percentPlayer1);
        const percentPlayer2 = useSelector(state => state.gameReducer.percentPlayer2);

        const dispatch = useDispatch();

        useDispatch(setPlayer1(currentUser));


        function completePlayer2Profile(listPlayers){
                let n = listPlayers.length;
                for (let i=0;i<n;i++){
                        if(listPlayers[i]["id"]!==currentUser.id){
                                let player = {
                                        id:listPlayers[i]["id"],
                                        userName:listPlayers[i]["userName"],
                                        energy:listPlayers[i]["energy"]
                                };
                                dispatch(setPlayer2(player));
                        }
                }
        }

        function completePlayer2Cards(listPlayers){
                let n = listPlayers.length;
                let pokemonPlayer2 = [];
                for (let i=0;i<n;i++){
                        if(listPlayers[i]["id"]!==currentUser.id){
                                console.log(p1.id);
                                pokemonPlayer2=listPlayers[i]["pokemons"];
                        }
                }
                dispatch(updateCardsPlayer2(pokemonPlayer2));
        }

        function updatePlayer2Profile(listPlayers){
                let n = listPlayers.length;
                let pokemonPlayer2 = [];
                for (let i=0;i<n;i++){
                        if(listPlayers[i]["id"]==p2["id"]){
                                console.log("is user 2:",p2.id);
                                pokemonPlayer2=listPlayers[i]["pokemons"];
                        }
                }
                dispatch(updateCardsPlayer2(pokemonPlayer2));
        }

        function updatePlayer2Cards(listPlayers){
                let n = listPlayers.length;
                let pokemonPlayer2 = [];
                for (let i=0;i<n;i++){
                        console.log("userList:",listPlayers[i]["userId"])
                        if(listPlayers[i]["id"]==p2["id"]){
                                pokemonPlayer2=listPlayers[i]["pokemons"];
                        }
                }
                dispatch(updateCardsPlayer2(pokemonPlayer2));
        }

        function updatePlayer1Profile(listPlayers){
                let n = listPlayers.length;
                for (let i=0;i<n;i++){
                        if(listPlayers[i]["id"]===currentUser.id){
                                let player = {
                                        id:listPlayers[i]["id"],
                                        userName:listPlayers[i]["userName"],
                                        energy:listPlayers[i]["energy"]
                                };
                                dispatch(setPlayer1(player));
                        }
                }
        }

        function updatePlayer1Cards(listPlayers){
                let n = listPlayers.length;
                let pokemonPlayer1 = [];
                for (let i=0;i<n;i++){
                        if(listPlayers[i]["id"]===currentUser.id){
                                pokemonPlayer1=listPlayers[i]["pokemons"];
                        }
                }
                dispatch(updateCardsPlayer1(pokemonPlayer1));
        }

        socket.on("choosePokemon",(result)=>{
                let players = result.players;
                completePlayer2Profile(players);
                completePlayer2Cards(players);
        });


        socket.on("gameState",(result)=>{
                let players = result.players;
                console.log("players:",players);
                //updatePlayer2Profile(players);
                updatePlayer2Cards(players);
                //updatePlayer1Profile(players);
                updatePlayer1Cards(players);
        });

        socket.on("looser",(data)=>{
                navigate("/EndGame");
        })

        function handleCardAclick(card) {
                dispatch(updateU1SelectedCard(card));  
        }

        function handleCardBclick(card) {
                dispatch(updateU2SelectedCard(card));   
        }

        function handlePercentPlayer1Change(newPercentValue) {
                dispatch(setPercentPlayer1(newPercentValue));
        }

        function handlePercentPlayer2Change(newPercentValue) {
                dispatch(setPercentPlayer2(newPercentValue));
        }

        function attack(){
                let data = JSON.stringify({
                        gameName: gameName,
                        attackerId: currentUser.id,
                        pokemonAttackerId: p1CardSelected.id,
                        defenderId: p2.id,
                        pokemonDefenderId: p2CardSelected.id
                });
                fetch(`${API_GAME}attack`,
                {
                method: "POST",
                headers:{
                        'Content-Type': 'application/json'
                },
                body: data,
                })
                .then(response=>{
                if(response.ok){

                }
                else{
                        throw new Error(`Sending message failed! status: ${response.status}`);
                }
                });
        }

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
                                                                <div class=" column">Player B</div>      
                                                         </div>     
                                                         
                                                         <div class="row">
                                                                        <div class="column">
                                                                                <div class="ui teal progress" data-percent={percentPlayer2} id="progressBarId1" >
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
                                                                <div class="column" key={item.id}>
                                                                <div class="shortCardB" onClick={() =>handleCardBclick(item)}>
                                                                <CardRowView card={item}></CardRowView></div> 
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
                                                                        <div class=" column">Player A</div>      
                                                                 </div>     
                                                                 <div class="row">
                                                                        <div class="column">
                                                                                <div class="ui teal progress" data-percent={percentPlayer1} id="progressBarId2" >
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
                                                                        <div class="column">
                                                                        <div class="shortCardA" onClick={() =>handleCardAclick(item)}>
                                                                        <CardRowView card={item} ></CardRowView></div> 
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





                </div> 
        </div>
</div>
    );
  };