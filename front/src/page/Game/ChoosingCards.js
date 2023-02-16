import React, { useState,useEffect,useContext } from "react";
import CardRowView from "../../components/card/CardRowView";
import { useSelector } from 'react-redux';
import "./ChoosingCards.css"
import { API_USER,API_GAME } from "../../ressource/config";
import { useNavigate } from "react-router-dom";
import {  useDispatch } from 'react-redux';
import { setPlayer1, setPlayer2, updateCardsPlayer1, updateCardsPlayer2 } from "../../redux/actions";
import { SocketContext } from "../../ressource/socket";

export const ChoosingCards = (props) => {
  
  let socket = useContext(SocketContext);

  const navigate = useNavigate();
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedEntireCard,setSelectedEntireCards] = useState([]);

  let currentUser=useSelector(state=>state.userReducer.user);

  const dispatch = useDispatch();

  let p1 = useSelector(state=>state.gameReducer.player1); 
  let p2 = useSelector(state=>state.gameReducer.player2);

  let player1Cards = useSelector(state=>state.gameReducer.cardsPlayer1);
  let player2Cards = useSelector(state=>state.gameReducer.cardsPlayer2);

  let gameName = useSelector(state=>state.gameReducer.roomName);


  function completePlayer2Profile(listPlayers){
    let n = listPlayers.length;
    for (let i=0;i<n;i++){
            if(listPlayers[i]["id"]!=currentUser.id){
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
                if(listPlayers[i]["userId"]!=currentUser.id){
                        pokemonPlayer2=listPlayers[i]["pokemons"];
                }
        }
        dispatch(updateCardsPlayer2(pokemonPlayer2));
  }

  socket.on("choosePokemon",(result)=>{
        let players = result.players;
        completePlayer2Profile(players);
        completePlayer2Cards(players);
  });

  function handleClick (card,id) {
    //check si la carte était déjà selected dans ce cas on la deselect
    //sinon on l'ajoute à la liste
    if (selectedCards.includes(id)) {
      setSelectedCards(selectedCards.filter((cardId) => cardId !== id));
      setSelectedEntireCards(selectedEntireCard.filter((card)=>card.id !== id));
    } else if (selectedCards.length < 4) {
      setSelectedCards([...selectedCards, id]);
      setSelectedEntireCards([...selectedEntireCard,card]);
    }
  };

  function handleButtonClick() {
    // call API to export selected cards
    dispatch(updateCardsPlayer1(selectedEntireCard));  
    fetch(API_GAME+"choosePokemon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          gameName: gameName, 
          userName: currentUser.login,
          id: currentUser.id,
          pokemonsId:selectedCards
        })
      })
      .then((response) => {
        if (response.ok) {
          console.log("Response of request :",response.json());
          navigate("/Play");
        } else {
          throw new Error("Error ! "+response.text);
        }
      });
  }

  const [cards, setCards] = useState([]);
  const fetchData = () => {
    fetch(API_USER+"cards")
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


 

return (
    <div>
        <div><h2>Select 4 cards </h2></div>
        <div>
        {selectedCards.length === 4 && 
        <button className="StartGame" onClick={handleButtonClick}>Start Game</button>
        }
      </div>
        <div style={{overflow: "auto", display: "flex", flexWrap: "wrap" }}>
        {
            cards.filter(card => currentUser.cardList.includes(card.id)).map((card, index) => {
            const isSelected = selectedCards.includes(card.id);
            const borderStyle = isSelected ? "5px solid red" : "2px solid gray";
            return (
                <div key={index}
                style={{ border: borderStyle }}
                onClick={() => handleClick(card, card.id)}>
                <CardRowView card={card}></CardRowView>
                </div>
            );
            })
        }
        </div>
        
    </div>
    );
      
};

