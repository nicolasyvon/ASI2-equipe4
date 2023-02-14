export class SendMessage {

    roomName:string;
    senderId:number;
    message:string;
  
    constructor(roomName:string, senderId:number, message:string) {
      this.roomName = roomName;
      this.senderId = senderId;
      this.message = message;
    }
  
}