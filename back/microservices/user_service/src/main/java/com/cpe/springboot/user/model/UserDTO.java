package com.cpe.springboot.user.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.cpe.springboot.card.model.CardModel;

//need to be set as Serializable in order to be acceptable by the communication BUS
public class UserDTO implements Serializable  {
	
    //need to set serialVersionUID otherwise emitter and receiver compute their own serialVersionUID that could be different
    private static final long serialVersionUID = 1069270118228032176L;
	  
	private Integer id;
	private String login;
	private String pwd;
	private float account;
	private String lastName;
	private String surName;
	private String email;
	private Set<Integer> cardList = new HashSet<>();
	
	public UserDTO() {
	}

	public UserDTO(UserModel user) {
		this.id = user.getId();
		this.login = user.getLogin();
		this.pwd = user.getPwd();
		this.account = user.getAccount();
		this.lastName = user.getLastName();
		this.surName = user.getSurName();
		this.email = user.getEmail();
		for (CardModel card : user.getCardList()) {
			this.cardList.add(card.getId());
		}
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public Set<Integer> getCardList() {
		return cardList;
	}

	public void setCardList(Set<Integer> cardList) {
		this.cardList = cardList;
	}

	public float getAccount() {
		return account;
	}

	public void setAccount(float account) {
		this.account = account;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getSurName() {
		return surName;
	}

	public void setSurName(String surName) {
		this.surName = surName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	  @Override
	  public String toString() {
		  return msgsent();
	      //return display();
	  }

	  public String msgsent(){
	      String result;
	      result= getLogin() + " " + getPwd()+ " " +getAccount()+ " " +getLastName()+ " " +getSurName()+ " " +getEmail()+ " " +getCardList();
	      return result;
	  }

	  public String display(){
	      String result;
	      result="["+getLogin()+"],\n\t pwd: \n \t\t"+getPwd()+"\n\t"+
	                               "account: \n\t\t"+getAccount()+"\n\t"+
	                               "lastName: \n\t\t"+getLastName()+"\n\t"+
	                               "surName: \n\t\t"+getSurName()+"\n\t" + 
	                               "email: \n\t\t"+getEmail()+"\n\t"+
	                               "cardList: \n\t\t"+getCardList()+"\n\t";

	      return result;
	  }

}
