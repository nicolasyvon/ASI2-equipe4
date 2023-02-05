import { configureStore } from '@reduxjs/toolkit';
import cardReducer from './reducers/CardReducer';
import userReducer from './reducers/UserReducer';
import listcardReducer from './reducers/ListCardReducer';
import listcardReducerPlayer2 from './reducers/ListCardReducerPlayer2';
import cardPlayer2Reducer from './reducers/CardPlayer2Reducer'


export default configureStore({
 reducer: {
               cardReducer : cardReducer,
               listcardReducer : listcardReducer,
               userReducer : userReducer,
               listcardReducerPlayer2 : listcardReducerPlayer2,
               cardPlayer2Reducer : cardPlayer2Reducer
          },
});