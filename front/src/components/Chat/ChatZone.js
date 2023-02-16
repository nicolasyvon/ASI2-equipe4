import React, { useState, useContext, useEffect} from 'react';
import { SocketContext } from '../../ressource/socket';
import { useSelector } from 'react-redux';
import { API_CHAT } from "../../ressource/config";


export const ChatZone = () => {

  let socket = useContext(SocketContext);
  var textArea = document.getElementById("textArea");
  var menuUser = document.getElementById("menuUser");

  let roomName = useSelector(state=>state.gameReducer.roomName);

  let user = useSelector(state=>state.userReducer.user);
  let [friend,setFriend] = useState("");
  let [message,setMessage] = useState("");


  useEffect(() => {
    socket.on("chatMessage",(messageFriend)=>{
      console.log("coucou il y a eu un message mais tu ne l'affiche pas");
      if(textArea!=null){
        textArea.insertAdjacentHTML(
          "beforeend",
          `<div className="ui raised segment">
          <a className="ui blue ribbon label">${messageFriend.senderName}</a>
          <span> 
            ${new Date().toLocaleString("fr-FR", {
              hour: "numeric",
              minute: "numeric",
            })}
          </span>
          <p>${messageFriend.message}</p>
        </div>`
        )
      }
    });
  },[socket,textArea]);  


  function sendMessage(){
    let data = JSON.stringify({
      roomName: roomName,
      senderId: user.id,
      message: message,
      senderName: user.login
    });
    console.log(data);
    fetch(`${API_CHAT}sendMessage`,
    {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: data,
    })
      setMessage("");
      if(textArea!=null){
        textArea.insertAdjacentHTML(
          "beforeend",
          `<div className="ui raised segment">
            <a className="ui green right ribbon label">Me</a>
            <span> 
              ${new Date().toLocaleString("fr-FR", {
                hour: "numeric",
                minute: "numeric",
              })}
            </span>
            <p>${message}</p>
          </div>`
        )
      }
  };

    return (
      <div className="ui segment" style={{ width: '500%'}}>
        <div className="ui five column grid">
          <div className="column">
            <div className="ui segment">
              <div className="ui top attached label">
                <div className="ui two column grid">
                  <div className="column">Chat</div>
                  <div className="column">
                    <div className="ui two column grid">
                      <div className="column">{user.login}</div>
                      <div className="column"> <i className="user circle icon"></i></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ui fluid search selection dropdown">
              <input type="hidden" name="country" />
              <i className="dropdown icon"></i>
              <div className="default text">Select User</div>
              <div className="menu" id="menuUser">
                {/* <div className="item" data-value="jd">
                  <i className="jd user circle icon"></i>
                  John Doe
                </div>
                <div className="item" data-value="er">
                  <i className="er user circle icon"></i>
                  Eric SMith
                </div> */}
              </div>
            </div>

            <div id="textArea"className="ui segment">
            </div>

            <div className="ui form">
              <div className="field">
                <textarea 
                  rows="2"
                  onChange={(data)=>(setMessage(data.target.value))}
                >
                </textarea>
              </div>
            </div>
            <button 
              className="fluid ui right labeled icon button" 
              onClick={sendMessage}
            >
              <i className="right arrow icon"></i>
              Send
            </button>
          </div>
        </div>
      </div>
    );
  };

