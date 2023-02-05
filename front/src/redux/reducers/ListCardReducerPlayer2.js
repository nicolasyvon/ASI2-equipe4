const listcardReducerPlayer2= (state={value:''},action) => {
    console.log(action);
    switch (action.type) {
        case 'UPDATE_CURRENT_LIST_CARD_PLAYER2':
            return {value:action.obj};
    default:
      return state;
    }
}

export default listcardReducerPlayer2;