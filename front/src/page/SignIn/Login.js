import React, { useState,useContext } from "react";
import { Form, Header,Button } from 'semantic-ui-react';
import "./Login.css";
import {  useDispatch } from 'react-redux';
import {updateUser} from '../../redux/actions/index';
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../ressource/socket";
import { API_USER } from "../../ressource/config";


export const Login = (props) =>{

    const dispatch = useDispatch();
    //let [authMode, setAuthMode] = useState("signin");
    let socket = useContext(SocketContext);
    const [log, setlog] = useState({});
    const navigate = useNavigate();

    const [currentUser,setCurrentUser]= useState({
                                        username:"",
                                        password:"",

                                    });
    
    /*const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
        }*/

    function processInput(event){
        const target = event.currentTarget;
        const value = target.value;
        const name = target.name;
        let currentVal=currentUser;
        setCurrentUser({...currentUser, [name]: value});
        currentVal[name]= value;
        //props.handleChange(currentVal);

    };

    async function Logverif() {
         // check if the input fields are not empty
         if (!currentUser.username || !currentUser.password) {
            alert("Remplissez bien tous les champs !!");
            return;
          }
       
        const response = await fetch(API_USER + "auth",   
        { 
            method: "POST",
            headers: { 
                //'Accept': 'application/json',
                'Content-Type': 'application/json'},
          body:JSON.stringify(currentUser)
        })
       
        if (response.ok) {
            const data = await response.json();
            socket.emit("userJoined",data+1);
            setlog(data);
            getUser(data);
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
         
    async function getUser(id) {
        const response = await fetch(API_USER + "user/" + (id+1));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("user connected");
        dispatch(updateUser(data));
        navigate("/");
        }
  
};
    
    function submitlog(){
        console.log(currentUser)
        Logverif()
    };

    function redirectHandler(page){
        console.log("redirection");
        navigate('/'+page);
    
    };
    
    return (
    <div className='Login'>
        <Form className="form-control">
            <Header as='h4' dividing className="Auth-form-title">
            Sign In
            </Header>
            <br></br>

            
            <Form.Field widths='equal' className="form-outline mb-12">
                <Form.Input fluid label='username' maxLength={15} placeholder='Username' name="username" onChange={processInput} value={currentUser.username} />
            </Form.Field>
            <br></br>

        
            <Form.Field  className="form-outline mb-6">
                <Form.Input type="password" maxLength={15} label="Password" placeholder="Password" onChange={processInput}  name="password" value={currentUser.password}/>
            </Form.Field>
            <br></br>

            <Button type='submit'  className="btn btn-primary btn-block mb-4" onClick={submitlog}>Submit</Button>

            <div className="text-center">
            Not registered yet?{" "}
         {/* <a className="link-primary" onClick={changeAuthMode}> 
                Sign Up
            </a>         */}
            <Button type='submit'  className="btn btn-primary btn-block mb-4" onClick={()=>redirectHandler("SignUp")}>Registration</Button>
            </div>
        </Form>
    </div>

);

  
    
}