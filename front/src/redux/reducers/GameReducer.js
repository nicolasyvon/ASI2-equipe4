const gameReducer= (state={user1_selectedCard: -1,user2_selectedCard: -1},action) => {
    console.log(action);
    switch (action.type) {
      case "UPDATE_U1_SELECTED_CARD":
        return {
          user1_selectedCard: action.obj,
        };
  
      case "UPDATE_U2_SELECTED_CARD":
        return {
          user2_selectedCard: action.obj,
        };
    default:
      return state;
    }
}

export default gameReducer;