const userReducer= (state={user: {}},action) => {
    switch (action.type) {
        case 'UPDATE_USER':
            return {user:action.user};

        case 'LOGOUT_USER':
        return {user: {}};
    default:
      return state;
    }
}

export default userReducer;
