export class SendMessage {

    roomName:string;
    senderId:number;
    receiverId:number;
    message:string;
  
    constructor(roomName:string, senderId:number, receiverId:number, message:string) {
      this.roomName = roomName;
      this.senderId = senderId;
      this.receiverId = receiverId;
      this.message = message;
    }
  
}