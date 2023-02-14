import CardDisplay from "../card/CardDisplay"
import CardGame from "../card/CardGame";
import React, { useState,useContext,useEffect } from "react";
import { API_USER } from "../../ressource/config";

export const GameField = () => {

        const [player1, setPlayer1] = useState({});
        const [player2, setPlayer2] = useState({});
        const [player1Cards, setPlayer1Cards] = useState([]);
        const [player2Cards, setPlayer2Cards] = useState([]);

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
        <div class="ui segment" style={{height:'100%'}}>
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
                                                                        <div class="ui teal progress" data-percent="74" id="progressBarId1" >
                                                                            <div class="label">Action Points</div>
                                                                            <div class="bar"></div>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                        <div class="ten wide column">
                                                <div class="ui four column grid">
                                                        <div class="column">
                                                                <div id="shortCardA1">
                                                                    CardA <br/>
                                                                <CardGame></CardGame></div> 
                                                        </div>
                                                        <div class="column">
                                                                <div id="shortCardA2">CardA <br/>
                                                                <CardGame></CardGame></div> 
                                                        </div>
                                                        <div class="column">
                                                                <div id="shortCardA3">CardA <br/>
                                                                <CardGame></CardGame></div> 
                                                        </div>
                                                        <div class="column">
                                                                <div id="shortCardA4">CardA <br/>
                                                                <CardGame></CardGame></div> 
                                                        </div>
                                                </div>
                                        </div>
                                        <div class="four wide column">
                                                <div id="fullCardA1">Card A1 <br/>
                                                <CardGame></CardGame></div> 
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
                                                <button class="huge ui primary button">
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
                                                                                <div class="ui teal progress" data-percent="80" id="progressBarId2" >
                                                                                    <div class="bar"></div>     
                                                                                    <div class="label">Action Points</div>                                                                                   
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                                     
                                                                 
                                                        </div>
                                                </div>
                                                <div class="ten wide column">
                                                        <div class="ui four column grid">
                                                                <div class="column">
                                                                        <div id="shortCardB1">CardB <br/>
                                                                <CardGame></CardGame></div> 
                                                                </div>
                                                                <div class="column">
                                                                        <div id="shortCardB2">CardB <br/>
                                                                <CardGame></CardGame></div> 
                                                                </div>
                                                                <div class="column">
                                                                        <div id="shortCardB3">CardB <br/>
                                                                <CardGame></CardGame></div> 
                                                                </div>
                                                                <div class="column">
                                                                        <div id="shortCardB4">CardB <br/>
                                                                <CardGame></CardGame></div> 
                                                                </div>
                                                        </div>
                                                </div>
                                                <div class="four wide column">
                                                        <div id="fullCardB1">CardB1 <br/>
                                                                <CardGame></CardGame></div> 
                                                </div>
                                        </div>
                                </div>





                </div> 
        </div>
</div>
    );
  };