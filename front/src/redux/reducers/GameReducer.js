const gameReducer= (state={player1:{},player2:{},player1_selectedCard: -1,player2_selectedCard: -1},action) => {
    console.log(action);
    switch (action.type) {
      case "UPDATE_U1_SELECTED_CARD":
        return {
          player1_selectedCard: action.obj,
        };
  
      case "UPDATE_U2_SELECTED_CARD":
        return {
          player2_selectedCard: action.obj,
        };

      case "SET_PLAYER1":
        return {
          player1: action.obj,
        };
  
      case "SET_PLAYER2":
        return {
          player2: action.obj,
        };

    default:
      return state;
    }
}

export default gameReducer;