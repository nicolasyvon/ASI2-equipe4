export class Room {

    private roomName:string;
    private players:number[];
  
    constructor(roomName:string, players:number[]) {
      this.roomName = roomName;
      this.players = players;
    }

    public getGameName():string{
      return this.roomName;
    }

    public getPlayers():number[]{
      return this.players;
    }


  
  
}