import React, { useEffect, useState } from "react"
import { GameField } from "../../components/battlefield/GameField";
import {ChatZone} from "../../components/battlefield/ChatZone";

export const GameBoard = () => {
    return (
        <div style={{ display: 'flex' }}>
        <div style={{ width: '400px', flexShrink: 0 }}>
          <ChatZone/>
        </div>
        <div style={{ width: '1400px', flexShrink: 0 }}>
          <GameField />
        </div>
      </div>
    );
  };
  