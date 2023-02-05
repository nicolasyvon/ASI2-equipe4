import 'semantic-ui-css/semantic.min.css'
//Create function component
import socketIOClient from 'socket.io-client';
import { updateUserId } from '../../redux/actions';
import React, { useEffect, useState ,useRef} from "react"
import { useDispatch } from 'react-redux';
import { Form, Header,Button, CommentContent } from 'semantic-ui-react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';



//Create function component
export const ChatInterface =(props) =>{
    const item = useSelector(state=> state.cardReducer.value);
    let currentUserId=useSelector(state=>state.userReducer.user_id);
    //const [socket, setSocket] = useState(null);
    const socketRef = useRef();


    console.log(parseInt(currentUserId))
    const [message,setMessage]= useState("");
    const [conversation,setConversation]= useState([]);

    var formChat = document.getElementById('chat');  

    const [historique, setHistorique] = useState([]);



    useEffect(()=> {
        socketRef.current = socketIOClient('http://localhost:3000', 
    { query: {
            userID: parseInt(currentUserId)
            }});

            console.log(socketRef.current)
            
            socketRef.current.on('welcome', function(id) { 
                console.log("retouuur acces")   
                
            }); 
                    
            socketRef.current.on('connectToRoom',function(data){
                console.log(data )

        });
        //historique(socket);
       
           
    } ,  [parseInt(currentUserId)]);

    function startChat(socket){
        console.log(message);
        socket.on('message room', function(message ) {  
            setConversation((prevMsg) => [...prevMsg,message]);
        });
    }
    /*
    function historique(socket){
        socket.on('donne historique', () => {
            console.log("on est la l'event voici")
            socket.emit('voici historique', historique);
          });
    }
    */
    
    function processInput(event){
        const target = event.currentTarget;
        const value = target.value;
        setMessage({value});
        props.handleChange(value);

    };

    

    const  handleSubmit = (e) => {
        e.preventDefault();
        if (message){
            console.log(message)
            socketRef.current.emit('chat message',message);   
            console.log(message);
            socketRef.current.on('message room', function(message ) {  
                setConversation((prevMsg) => [...prevMsg,message]);
            });            
            setMessage('');

        }

    };
  

  return (

    <div>
    <form onSubmit={handleSubmit}>
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
    </div>
      <button type="submit">Send</button>
    </form>
    <div>
    {conversation.map((entry, index) => {
	return (
        <div key={index}>
          <p>{entry}</p>
        </div>);
    })}


    </div>
  </div>
);

};

export default ChatInterface;