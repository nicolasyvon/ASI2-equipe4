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
                        type: 'UPDATE_U1_SELECTED_CARD', 
                        obj: value 
                }; 
        } 

export const updateListCard = 
(value) => {
        return { type: 'UPDATE_CURRENT_LIST_CARD', obj: value }; 
} 

    