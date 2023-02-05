import { useState, useEffect, useRef } from 'react';
import socketIOClient from 'socket.io-client';
import { updateUserId } from '../../redux/actions';




export const ClientSocket = (props) => {

    [user, setUser] = useState([])
    let dispatch=useDispatch();
    dispatch(updateUserId(user))

    const socket = io({ query: {
                            userID: user.user_id
                            }
                        }); 
                        
    socket.on('welcome', function(id) { 
        console.log("retouuur acces")   
        
    }); 
    socket.on('connectToRoom',function(data){
        console.log(data )           
    });

    if (input.value) {           
        input.value = '';  
    
    } 
    startChat(socket); };

    function startChat(socket){
        var formChat = document.getElementById('chat');  
        var inputChat = document.getElementById('chatInput'); 

        formChat.addEventListener('submit', function(e) { 
        e.preventDefault(); 
        if (inputChat.value) {      
        socket.emit('chat message', inputChat.value);      
        inputChat.value = '';  
        
        }  });

        socket.on('message room', function(message ) {    
        var item = document.createElement('li'); 
        item.textContent = message;   
        messages.appendChild(item); 
        console.log(message);
        window.scrollTo(0, document.body.scrollHeight);  

        historique.push(message);

        console.log(historique)});
        socket.on('donne historique' ,() => {
            console.log("on est la l'event voici")
            socket.emit("voici historique" , historique);
        });
    }