export const updateUser = (user)=>{
        return { 
                type: 'UPDATE_USER', 
                user: user 
                };
        };

export const logoutUser = () => {
        return {
                type: 'LOGOUT_USER'
        };
        };

export const updateCurrentCard = 
(value)=>{
                return { 
                        type: 'UPDATE_CURRENT_CARD', 
                        obj: value 
                }; 
        } 

export const updateU1SelectedCard = 
(value)=>{
                return { 
                        type: 'UPDATE_U1_SELECTED_CARD', 
                        obj: value 
                }; 
        } 

export const updateU2SelectedCard = 
(value)=>{
                return { 
                        type: 'UPDATE_U2_SELECTED_CARD', 
                        obj: value 
                }; 
        } 

export const setPlayer1 = 
(value)=>{
                return { 
                        type: 'SET_PLAYER1', 
                        obj: value 
                }; 
        } 

export const setPlayer2 = 
(value)=>{
                return { 
                        type: 'SET_PLAYER2', 
                        obj: value 
                }; 
        } 


export const setPercentPlayer1 = 
(value)=>{
                return { 
                        type: 'SET_PERCENT_PLAYER1', 
                        obj: value 
                }; 
        } 

export const setPercentPlayer2 = 
(value)=>{
                return { 
                        type: 'SET_PERCENT_PLAYER2', 
                        obj: value 
                }; 
        } 

export const updateListCard = 
(value) => {
        return { type: 'UPDATE_CURRENT_LIST_CARD', obj: value }; 
} 

export const updateCardsPlayer1 = 
(value)=>{
                return { 
                        type: 'UPDATE_CARDS_PLAYER1', 
                        obj: value 
                }; 
        } 

export const updateCardsPlayer2 = 
(value)=>{
                return { 
                        type: 'UPDATE_CARDS_PLAYER2', 
                        obj: value 
                }; 
        } 

export const setRoomName = 
(value)=>{
                return { 
                        type: 'SET_ROOM_NAME', 
                        obj: value 
                }; 
        } 

    