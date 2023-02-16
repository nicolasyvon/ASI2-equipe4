import React from 'react';
import { useState } from "react";
import './Room.css'
import { API_GAME } from "../../ressource/config";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {  useDispatch } from 'react-redux';
import { setRoomName } from "../../redux/actions";

export const EndGame = () => {

 
  return (
    <div >
        END GAME
    </div>
  );

  }
