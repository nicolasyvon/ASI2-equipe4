import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../ressource/socket";
import React, { useContext, useState } from "react";
import { setRoomName } from "../../redux/actions";
import {  useDispatch } from 'react-redux';

export const WaitingRoom= () => {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  let socket = useContext(SocketContext);
  const navigate = useNavigate();

  // setTimeout(() => {
  //   setLoading(false);
  // }, 5000);

  socket.on("joinGame",(data)=>{
    navigate("/ChoosingCards");
  })

  return (
    <div className="container">
      {loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Waiting for an opponent...</span>
        </div>
      ) : (
        <div>
          <h1>Starting game </h1>
          <p>Your game is about to start, choose your cards </p>
        </div>
      )}
    </div>
  );
}

