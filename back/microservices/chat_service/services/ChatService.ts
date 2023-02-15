import axios from "axios";
import { Room } from "../model/ChatModel/Room.js";
import { CreateRoom } from "../model/RequestModel/CreateRoom.js";
import { SendMessage } from "model/RequestModel/SendMessage.js";

export class ChatService {

  rooms:Map<string,Room>= new Map<string,Room>();

  constructor() {
  }

  public gameExist(roomName:string):boolean{
    return this.rooms.has(roomName);
  }

  public createRoom(body:CreateRoom):boolean{
    let ret = false;
    if(!this.gameExist(body.roomName)){
      let room = new Room(body.roomName);
      room.addPlayer(body.player);
      this.rooms.set(body.roomName,room);
      ret = true;
    }
    return ret;    
  }

  public joinRoom(body:CreateRoom):boolean{
    let ret = false;
    if(this.gameExist(body.roomName)){
      let room =this.rooms.get(body.roomName);
      if(room!=undefined){
        room.addPlayer(body.player);
        this.updateRoom(room);
        ret = true;
      }
    }
    return ret;
  }

  public updateRoom(roomUpdate:Room):void{
    if (this.gameExist(roomUpdate.getGameName())){
      this.rooms.delete(roomUpdate.getGameName());
      this.rooms.set(roomUpdate.getGameName(),roomUpdate);
    }
   }

  public sendMessage(body:SendMessage){
    let room = this.rooms.get(body.roomName);
    if (room != undefined){
      let receiverId = room.getOtherPlayerId(body.senderId);
      this.notifyUser(receiverId,body,"chatMessage");
    }
  }

  notifyUser(userId:number,data,event:string){
    let body = { event: event, data: data, dest: userId };
    axios
        .post(
          `http://notification-service:${process.env.NOTIFICATION_DOCKER_PORT}/notifyUser`,
          body
        )
        .catch((err) => {
          throw new Error(err);
    });
  }
}