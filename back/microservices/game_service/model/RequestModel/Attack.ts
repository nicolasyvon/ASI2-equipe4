export class Attack {

    gameName:string;
    attackerId:number;
    pokemonAttackerId:number;
    defenderId:number;
    pokemonDefenderId:number;
  
    constructor(gameName:string, attackerId:number, pokemonAttackerId:number, defenderId:number, pokemonDefenderId:number) {
      this.gameName = gameName;
      this.attackerId = attackerId;
      this.pokemonAttackerId = pokemonAttackerId;
      this.defenderId = defenderId;
      this.pokemonDefenderId = pokemonDefenderId;
    }
}