export class CreateRoom {

    roomName:string;
    players:number[];
  
    constructor(gameName:string, players:number[]) {
      this.roomName = gameName;
      this.players = players;
    }
  
}