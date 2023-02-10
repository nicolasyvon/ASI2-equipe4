import { Player } from "./Player.js";

export class Game {

    private gameName:string;
    private players:Map<number,Player> = new Map<number,Player>();
    private numberOfPlayer:number;
  
    constructor(gameName:string, player:Player) {
      this.gameName = gameName;
      this.players.set(player.getId(),player);
      this.numberOfPlayer=2;
    }

    public updatePlayer(player:Player){
      this.players.delete(player.getId());
      this.players.set(player.getId(),player);
    }

    public addPlayer(player:Player){
      this.players.set(player.getId(),player);
    }
    
    public isGameFull():boolean{
      let ret=false;
      if (this.players.size>=this.numberOfPlayer){
        ret=true;
      }
      return ret;
    }

    public getGameName():string{
      return this.gameName;
    }

    public getPlayer(id:number):Player{
      return this.players.get(id)!;
    }

    public getPlayers():Map<number,Player>{
      return this.players;
    }


  
  
}