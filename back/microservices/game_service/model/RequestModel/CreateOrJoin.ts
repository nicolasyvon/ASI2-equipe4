export class CreateOrJoin {

    gameName:string;
    userName:string;
    id:number;
  
    constructor(gameName:string, userName:string, id:number) {
      this.gameName = gameName;
      this.userName = userName;
      this.id = id;
    }
}