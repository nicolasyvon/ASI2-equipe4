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
export const updateCurrentCardPlayer2 = 
(value)=>{
                return { 
                        type: 'UPDATE_CURRENT_CARD_PLAYER2', 
                        obj: value 
                }; 
        } 



export const updateListCard = 
(value) => {
        return { type: 'UPDATE_CURRENT_LIST_CARD', obj: value }; 
} 
export const updateListCardPlayer2 = 
(value) => {
        return { type: 'UPDATE_CURRENT_LIST_CARD_PLAYER2', obj: value }; 
} 
    