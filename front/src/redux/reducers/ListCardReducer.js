const listcardReducer= (state={value:''},action) => {
    console.log(action);
    switch (action.type) {
        case 'UPDATE_CURRENT_LIST_CARD':
            return {value:action.obj};
    default:
      return state;
    }
}

export default listcardReducer;