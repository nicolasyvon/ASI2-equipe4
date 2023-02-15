import "./BottomSide.css";
import {ButtonContainer} from "./container/ButtonContainer";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Sell } from '../../page/SoldCard/Sell';
import { Buy } from '../../page/BuyCard/Buy';
import {Login} from '../../page/SignIn/Login';
import {SignUp} from '../../page/SignUp/SignUp';
import {GameBoard} from '../../page/Game/GameBoard';
import {SocketContext, socket} from '../../ressource/socket';

 


 

export const BottomSide= (props) =>{
    return(
        <div className='BottomSide'>
            <SocketContext.Provider value={socket}>
                <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<ButtonContainer/>} />
                            <Route path='/Sell' element={<Sell/>} />
                            <Route path='/Buy' element={<Buy/>} />
                            <Route path='/SignIn' element={<Login/>}/>
                            <Route path='/SignUp' element={<SignUp/>}/>
                            <Route path='/Play' element={<GameBoard/>}/>
                        </Routes>
                </BrowserRouter>
            </SocketContext.Provider>
        </div>
    );
}