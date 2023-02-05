import React, { useState,useContext } from "react";
import { Form, Header,Button } from 'semantic-ui-react';
import "./Login.css";
import {  useDispatch } from 'react-redux';
import {updateUserId} from '../../redux/actions/index';
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../ressource/socket";


export const Login = (props) =>{

    const dispatch = useDispatch();
    let [authMode, setAuthMode] = useState("signin");
    let socket = useContext(SocketContext);
    const [log, setlog] = useState({});


    const [currentUser,setCurrentUser]= useState({
                                        username:"",
                                        password:"",

                                    });
    
    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
        }

    function processInput(event){
        const target = event.currentTarget;
        const value = target.value;
        const name = target.name;
        let currentVal=currentUser;
        setCurrentUser({...currentUser, [name]: value});
        currentVal[name]= value;
        props.handleChange(currentVal);

    };



    function Logverif() {
        const fetchData = () => {
            fetch("http://vps.cpe-sn.fr:8083/auth",   
            { 
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json' 
                },
              method: "POST",
              body:JSON.stringify( currentUser)
            })
               .then(response => {
                   return response.json()
                 })
                .then(data => {
                  setlog(data)
                  dispatch(updateUserId(data))
                 }
                 
                 )
             }
             console.log(log)

        fetchData()

        return (<div>home</div>)};
    const navigate = useNavigate();
    function submitlog(data){
        console.log(currentUser)
        navigate('/'+data);
        Logverif()
    }
    
    if (authMode === "signin") {
        return (
        <div className='Login'>
            <Form className="form-control">
                <Header as='h4' dividing className="Auth-form-title">
                Sign In
                </Header>
                <br></br>

                
                <Form.Field widths='equal' className="form-outline mb-12">
                    <Form.Input fluid label='username'  placeholder='username' name="username" onChange={processInput} value={currentUser.username} />
                </Form.Field>
                <br></br>

            
                <Form.Field  className="form-outline mb-6">
                    <Form.Input type="password" label="Password" placeholder="" onChange={processInput}  name="password" value={currentUser.password}/>
                </Form.Field>
                <br></br>

                <Button type='submit'  className="btn btn-primary btn-block mb-4" onClick={()=>submitlog("")}>Submit</Button>

                <div className="text-center">
                Not registered yet?{" "}
                <a className="link-primary" onClick={changeAuthMode}>
                    Sign Up
                </a>            
                </div>
            </Form>
        </div>

    );

    
    }
    return (
    <div className='SignUp'> 
    <Form className="form-control">
        <Header as='h4' dividing className="Auth-form-title">
        Sign Up
        </Header>
        <br></br>

        
        <Form.Field widths='equal' className="form-outline mb-12">
            <Form.Input fluid label='Surname'  placeholder='Surname' name="surname" onChange={processInput} value={currentUser.surname} />
        </Form.Field>
        <br></br>
        <Form.Field widths='equal' className="form-outline mb-12">
            <Form.Input fluid label='name'  placeholder='name' name="name" onChange={processInput} value={currentUser.name} />
        </Form.Field>
        <br></br>

        <Form.Field  className="form-outline mb-6">
            <Form.Input type="password" label="Password" placeholder="" onChange={processInput}  name="pwd" value={currentUser.pwd}/>
        </Form.Field>
        <br></br>
        <Form.Field  className="form-outline mb-6">
            <Form.Input type="repassword" label="Re Password" placeholder="" onChange={processInput}  name="pwd" value={currentUser.repwd}/>
        </Form.Field>
        <br></br>

        <Button type='submit'  className="btn btn-primary btn-block mb-4" onClick={submitlog}>Submit</Button>

        <div className="text-center">
        Already registered?{" "}
        <a className="link-primary" onClick={changeAuthMode}>
            Sign In
        </a>            
        </div>
    </Form>
    </div>
);
}