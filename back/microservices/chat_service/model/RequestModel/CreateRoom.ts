export class CreateRoom {

    roomName:string;
    player:number;
  
    constructor(gameName:string, player:number) {
      this.roomName = gameName;
      this.player = player;
    }
  
}