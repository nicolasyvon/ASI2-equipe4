import React, { useEffect, useState } from "react"
import './NavBarHome.css';
import { useSelector } from 'react-redux';
import { API_USER } from "../../ressource/config";
import { useDispatch } from 'react-redux';
import {logoutUser} from '../../redux/actions/index';
import { useNavigate } from "react-router-dom";

export const NavBarHome= (props) =>{
    
    const [moneyUser, setMoneyUser] = useState(-1);
    const [nameUser, setNameUser] = useState('noName');
    let currentUser = useSelector(state=>state.userReducer.user);
    
    const dispatch = useDispatch();

    //const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser());
        alert("Vous êtes déconnecté");
        //navigate("/");
    };

    const fetchData = () => {
      fetch(API_USER+"user/"+currentUser.id,
      {
          method: "GET",
            headers: { 
                //'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
      })
         .then(response => {
          //console.log(response.json())
             return response.json()
           })
          .then(data => {
            setMoneyUser(data['account']);
            console.log("fetch:"+moneyUser);
            setNameUser(data['login']);
            console.log("fetch:"+nameUser);
           })
       }
       useEffect(() => {
        if (currentUser) {
          fetchData();
        }
          }, [currentUser,moneyUser, nameUser]);

       
    
    return(
        <div>
            <div className="MoneyUser">
              <img alt='MoneyImage' src="/images/money.png" className='MoneyImage'/>
              <span className="MoneyLabel">{moneyUser}</span>
            </div> 
            <div className="user">
              <img alt='userImg' src="/images/user.png" className="userImages"/>
              <span className="userLabel">{nameUser}</span>
            </div>
            <div className="logout">
            <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
        );
}