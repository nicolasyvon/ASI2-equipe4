import React from 'react';
import { useState } from "react";
import './Room.css'
import { API_GAME } from "../../ressource/config";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

export const Room = () => {

  const [roomName, setRoomName] = useState("");
  const navigate = useNavigate();
  let currentUser = useSelector(state=>state.userReducer.user);

  const handleInputChange = (event) => {
    setRoomName(event.target.value);
  };

  const handleCreateRoomClick = () => {
    if (roomName.trim() !== "") {
      const roomNameLower = roomName.toLowerCase();
      fetch(API_GAME+"createGame", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          gameName: roomNameLower,
          userName: currentUser.login,
          id: currentUser.id
        })
      })
      .then((response) => {
        if (response.ok) {
          alert("Game created!");
          navigate("/ChoosingCards", { roomName: roomNameLower });
        } else {
          throw new Error("Error ! "+response.text);
        }
      });
    }
    };
  

  const handleJoinRoomClick = () => {
    if (roomName.trim() !== "") {
      const roomNameLower = roomName.toLowerCase();
      fetch(API_GAME+"joinGame", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          gameName: roomNameLower,
          userName: currentUser.login,
          id: currentUser.id
        })
      })
      .then((response) => {
        if (response.ok) {
          alert("Game joined!");
          navigate("/ChoosingCards");
        } else {
          throw new Error("Error ! "+response.text);
        }
      });
    }
  };
  return (
    <div className="container">
        <h2>Room Name :</h2>
        <input 
          type="text" 
          maxLength={15} 
          placeholder="Enter the room name" 
          value={roomName}
          onChange={handleInputChange}
          required
          />
      <div className="button-container">
        <button id="createRoom" onClick={handleCreateRoomClick}>
          Create a room
        </button>
        <button id="joinRoom" onClick={handleJoinRoomClick}>
          Join a room
        </button>
      </div>
    </div>
  );

  }
