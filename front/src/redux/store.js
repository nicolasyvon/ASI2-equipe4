import { configureStore } from '@reduxjs/toolkit';
import cardReducer from './reducers/CardReducer';
import userReducer from './reducers/UserReducer';
import gameReducer from './reducers/GameReducer';


export default configureStore({
 reducer: {
               cardReducer : cardReducer,
               userReducer : userReducer,
               gameReducer : gameReducer
          },
});