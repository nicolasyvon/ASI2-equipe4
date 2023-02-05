package com.cpe.springboot.bus.service;

import javax.jms.TextMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import com.cpe.springboot.user.model.UserDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class BusService {

    @Autowired
    JmsTemplate jmsTemplate;
    @Autowired
    ObjectMapper objectMapper;


    public void sendMsg(UserDTO userDTO) {
        //System.out.println("[BUSSERVICE] SEND String MSG=["+userDTO+"]");
        //jmsTemplate.convertAndSend("RESULT_BUS_MNG",userDTO);
    	sendMsg( userDTO , "UserUpdate");
    }

    public void sendMsg(UserDTO userDTO, String busName) {
    	 System.out.println("[BUSSERVICE] SEND String MSG=["+userDTO+"] to Bus=["+busName+"]");

         jmsTemplate.send(busName, s -> {
             try {
                 TextMessage msg = s.createTextMessage(objectMapper.writeValueAsString(userDTO));
                 msg.setStringProperty("Content-Type", "application/json");
                 msg.setStringProperty("ObjectType", userDTO.getClass().getCanonicalName());

                 return msg;
             } catch (JsonProcessingException e) {
                 throw new RuntimeException(e);
             }
         });

    }
}
