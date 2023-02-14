export class Room {

    private roomName:string;
    private players:number[];
  
    constructor(roomName:string) {
      this.roomName = roomName;
      this.players = [];
    }

    public addPlayer(idPlayer:number){
      this.players.push(idPlayer);
    }

    public getGameName():string{
      return this.roomName;
    }

    public getPlayers():number[]{
      return this.players;
    }

    public getOtherPlayerId(idPlayer:number):number{
      let n = this.players.length;
      let idTemp = -1;
      let idOtherPlayer = -1;
      for (let i=0;i<n;i++){
        idTemp=this.players[i];
        if (idPlayer != idTemp){
          idOtherPlayer = idTemp;
        }
      }
      return idOtherPlayer;
    }


  
  
}