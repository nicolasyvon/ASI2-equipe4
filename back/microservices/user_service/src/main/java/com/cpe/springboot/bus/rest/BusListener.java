package com.cpe.springboot.bus.rest;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.TextMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Component;

import com.cpe.springboot.user.controller.UserService;
import com.cpe.springboot.user.model.UserDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import antlr.collections.List;

@Component
public class BusListener {
	
    @Autowired
	UserService userService;
    @Autowired
    JmsTemplate jmsTemplate;
    @Autowired
    ObjectMapper objectMapper;

    private void doReceive(String busName, TextMessage message) {
        try {
            String clazz = message.getStringProperty("ObjectType");
            Object o = objectMapper.readValue(message.getText(), Class.forName(clazz));
            
            System.out.println("[BUSLISTENER] [CHANNEL "+busName+"] RECEIVED String MSG=["+message.getText()+"]");

            if (o instanceof UserDTO) {
                UserDTO userDTO  = (UserDTO)o;
                userService.updateUser(userDTO);
                System.out.println("on a update " + userDTO.getLogin()  + " en utilisant le bus.");


            }

        } catch (JMSException | JsonProcessingException | ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
        }
    }
    
    @JmsListener(destination = "UserUpdate2", containerFactory = "connectionFactory")
    public void receiveMessage(TextMessage  message) {
        	doReceive("UserUpdate2", message);

    }
  

}
