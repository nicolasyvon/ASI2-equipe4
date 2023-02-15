import React, { useState,useEffect } from "react";
import CardRowView from "../../components/card/CardRowView";
import { useSelector } from 'react-redux';
import "./ChoosingCards.css"
import { API_USER,API_GAME } from "../../ressource/config";
import { useNavigate } from "react-router-dom";

export const ChoosingCards = (props) => {
  
    const navigate = useNavigate();
    const [selectedCards, setSelectedCards] = useState([]);
    let currentUser=useSelector(state=>state.userReducer.user);

  function handleClick (id) {
    //check si la carte était déjà selected dans ce cas on la deselect
    //sinon on l'ajoute à la liste
    if (selectedCards.includes(id)) {
      setSelectedCards(selectedCards.filter((cardId) => cardId !== id));
    } else if (selectedCards.length < 4) {
      setSelectedCards([...selectedCards, id]);
    }
  };

  function handleButtonClick() {
    // call API to export selected cards
    console.log("Selected cards:", selectedCards);
    fetch(API_GAME+"choosePokemon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          gameName: props.roomName,
          userName: currentUser.login,
          id: currentUser.id,
          pokemonsId:selectedCards
        })
      })
      .then((response) => {
        if (response.ok) {
            console.log(currentUser.login+" in the game")
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
                onClick={() => handleClick(card.id)}>
                <CardRowView card={card}></CardRowView>
                </div>
            );
            })
        }
        </div>
        
    </div>
    );
      
};

