import React, { useEffect, useState } from "react"
import './NavBarHome.css';
import { useSelector } from 'react-redux';

export const NavBarHome= (props) =>{
    const [moneyUser, setMoneyUser] = useState(-1);
    const [nameUser, setNameUser] = useState('noName');
    let currentUserId=useSelector(state=>state.userReducer.user_id);
    const fetchData = () => {
      fetch("http://vps.cpe-sn.fr:8083/user/"+currentUserId)
         .then(response => {
          //console.log(response.json())
             return response.json()
           })
          .then(data => {
            setMoneyUser(data['account']);
            console.log("fetch:"+moneyUser);
            setNameUser(data['surName']);
            console.log("fetch:"+nameUser);
           })
       }
       useEffect(() => {
        fetchData()
          }, moneyUser)
    
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
        </div>
        );
}