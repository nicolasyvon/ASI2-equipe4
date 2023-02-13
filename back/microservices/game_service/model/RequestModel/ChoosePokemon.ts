export class ChoosePokemon {

    gameName:string;
    userName:string;
    id:number;
    pokemonsId:number[]; //liste d'id de pokemons
  
    constructor(gameName:string, userName:string, pokemonsId:number[]) {
      this.gameName = gameName;
      this.userName = userName;
      this.pokemonsId = pokemonsId;
    }
}