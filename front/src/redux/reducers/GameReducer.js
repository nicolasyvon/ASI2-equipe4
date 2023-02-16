const initialState = {
  player1:{},
  player2:{},
  player1_selectedCard: null,
  player2_selectedCard: null,
  percentPlayer1: 100,
  percentPlayer2: 100,
  cardsPlayer1:[],
  cardsPlayer2:[],
  roomName:""
}

const gameReducer= (state=initialState,action) => {
    console.log(action);
    switch (action.type) {
      case "UPDATE_U1_SELECTED_CARD":
        return {
          ...state,
          player1_selectedCard: action.obj,
        };
  
      case "UPDATE_U2_SELECTED_CARD":
        return {
          ...state,
          player2_selectedCard: action.obj,
        };

      case "SET_PLAYER1":
        return {
          ...state,
          player1: action.obj,
        };
  
      case "SET_PLAYER2":
        return {
          ...state,
          player2: action.obj,
        };

      case "SET_PERCENT_PLAYER1":
      return {
        ...state,
        percentPlayer1: action.obj,
      };      
      
      case "UPDATE_CARDS_PLAYER1":
      return {
        ...state,
        cardsPlayer1: action.obj,
      };

      case "UPDATE_CARDS_PLAYER2":
      return {
        ...state,
        cardsPlayer2: action.obj,
      };

      case "SET_ROOM_NAME":
      return {
        ...state,
        roomName: action.obj,
      };

    default:
      return state;
    }
}

export default gameReducer;