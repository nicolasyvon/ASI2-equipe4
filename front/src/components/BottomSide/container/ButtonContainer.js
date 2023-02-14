import {Button} from '../../Button/Button';
import "./ButtonContainer.css";
import { useNavigate } from "react-router-dom";

export const ButtonContainer= (props) =>{
    const navigate = useNavigate();
    function redirectHandler(data){
        console.log("redirection");
        navigate('/'+data);
    
    };
    return(
        <div className='ButtonContainer'>
                
                <div className='Buy' onClick={()=>redirectHandler("Buy")}>
                    <Button title="BUY" visual_source="/images/buy.png"/>
                </div>

                <div className='Sell' onClick={()=>redirectHandler("Sell")}>
                    <Button title="SELL" visual_source="/images/sell.png"/>
                </div>

                <div className='Play' onClick={()=>redirectHandler("RoomManager")}>
                    <Button title="PLAY" visual_source="/images/play.png"/>
                </div>

                <div className='Connection' onClick={()=>redirectHandler("SignIn")}>
                    <Button title="CONNECT" visual_source="/images/user.png"/>
                </div>

        </div>
        );
}