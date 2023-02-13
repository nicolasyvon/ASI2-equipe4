import "./ChatBox.css";
import React,{useState,useContext} from "react";
import { SocketContext } from "../../ressource/socket";

export const ChatBox= (props) =>{
    let socket = useContext(SocketContext);
    const [conversation,setConversation]=useState([]);
    socket.on("chatMessage",(message)=>{
        setConversation((prevMsg) => [...prevMsg,message]);
    })
    return(
        <div className='chatBox'>
            <div className="message">
            <input type="text" className='inputMessages'/>
            <button className="sendButton">
                Button
            </button>
            </div>
            <div className="chat">
                {conversation}
            </div>
            <div className="information">
                <div className="userBattle">
                    <img alt="imageUser" src="/images/user.png" className="imageUser"/>
                </div>
                <select className="selectFriend">
                    <option value="Option 1">Option 1</option>
                    <option value="Option 2">Option 2</option>
                    <option value="Option 3">Option 3</option>
                </select>
            </div>
        </div>
        );
}