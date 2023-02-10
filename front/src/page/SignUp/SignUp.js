import React, { useState,useContext } from "react";
import { Form, Header,Button } from 'semantic-ui-react';
import "./SignUp.css";
import {  useDispatch } from 'react-redux';
import {updateUser} from '../../redux/actions/index';
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../ressource/socket";
import { API_USER } from "../../ressource/config";
import { useRef } from "react";

export const SignUp = (props) =>{

    const dispatch = useDispatch();
    //let [authMode, setAuthMode] = useState("signin");
    let socket = useContext(SocketContext);
    const [log, setlog] = useState({});
    const navigate = useNavigate();


    const [currentUser,setCurrentUser]= useState({
                                        username:"",
                                        pwd:"",

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

    //check si le username n'est en déjà utilisé
    async function checkUsername() {
        // check if the input fields are not empty
        if ((!currentUser.username || !currentUser.pwd || !currentUser.name || !currentUser.surname|| !currentUser.email || !currentUser.repwd) &&
        currentUser.pwd === currentUser.repwd) {
            alert("Remplissez bien tous les champs !!");
            return;
        }
    
        // Check if the user already exists in the database
        const checkResponse = await fetch(`${API_USER}user/${currentUser.id}`);
        if (checkResponse.status === 200) {
            alert("Ce nom d'utilisateur existe déjà !!");
            return;
        }
    
        fetch(`${API_USER}user`,   
        { 
            method: "POST",
            headers: { 
                //'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
            id: 0,
            login: currentUser.username,
            pwd: currentUser.pwd,
            account: 50000,
            lastName: currentUser.name,
            surName: currentUser.surname,
            email: currentUser.email,
            cardList: [0],
            
            }),
        })
        .then(response => {
            if (response.ok) {
               return response.json();
            } else {
               throw new Error(`Registration failed! status: ${response.status}`);
            }
         })
         .then(data => {
            socket.emit("userJoined",data.id);
            setlog(data);
            dispatch(updateUser(data));
            console.log("user created");
            navigate("/");
         })
         .catch((error) => {
            console.error("Error:", error);
            alert(error.message);
         });
    }
    ;

    function submitlog(data){
        console.log(currentUser)
        navigate('/'+data);
        checkUsername()
    };

    function redirectHandler(data){
        console.log("redirection");
        navigate('/'+data);
    
    };
    
    return (
        <div className='SignUp'> 
        <Form className="form-control">
            <Header as='h4' dividing className="Auth-form-title">
            Sign Up
            </Header>
            <br></br>
            
            <Form.Field widths='equal' className="form-outline mb-12">
                <Form.Input fluid label='Surname' maxLength={15} placeholder='Surname' name="surname" onChange={processInput} value={currentUser.surname} />
            </Form.Field>
            <br></br>
            <Form.Field widths='equal' className="form-outline mb-12">
                <Form.Input fluid label='Name' maxLength={15} placeholder='Name' name="name" onChange={processInput} value={currentUser.name} />
            </Form.Field>
            <br></br>
            <Form.Field widths='equal' className="form-outline mb-12">
                <Form.Input fluid label='Email' maxLength={15} type="email" placeholder='Email' name="email" onChange={processInput} value={currentUser.email} />
            </Form.Field>
            <br></br>
            <Form.Field widths='equal' className="form-outline mb-12">
                <Form.Input fluid label='Username' maxLength={15} placeholder='Username' name="username" onChange={processInput} value={currentUser.username} />
            </Form.Field>
            <br></br>
            <Form.Field  className="form-outline mb-6">
                <Form.Input type="password" maxLength={15} label="Password" placeholder="Password" onChange={processInput}  name="pwd" value={currentUser.pwd}/>
            </Form.Field>
            <br></br>
            <Form.Field  className="form-outline mb-6">
                <Form.Input type="password" maxLength={15} label="Re Password" placeholder="Password again" onChange={processInput}  name="repwd" value={currentUser.repwd}/>
            </Form.Field>
            <br></br>
    
            <Button type='submit'  className="btn btn-primary btn-block mb-4" onClick={submitlog}>Submit</Button>
    
            <div className="text-center">
            Already registered?{" "}
              
            {/* <a className="link-primary" onClick={changeAuthMode}> 
                Sign In
            </a>         */}
            <Button type='submit'  className="btn btn-primary btn-block mb-4" onClick={()=>redirectHandler("SignIn")}>Connexion</Button>
                    
            </div>
            
        </Form>
        </div>
    );
   
}