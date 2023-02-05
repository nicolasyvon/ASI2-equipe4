const userReducer= (state={user_id:-1},action) => {
    switch (action.type) {
        case 'UPDATE_USER_ID':
            return {user_id:action.id};
    default:
      return state;
    }
}

export default userReducer;
