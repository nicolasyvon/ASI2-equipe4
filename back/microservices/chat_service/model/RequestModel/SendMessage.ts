export class SendMessage {

    roomName:string;
    senderId:number;
    senderName:string;
    message:string;
  
    constructor(roomName:string, senderId:number, message:string, senderName:string) {
      this.roomName = roomName;
      this.senderId = senderId;
      this.message = message;
      this.senderName = senderName;
    }
  
}