import { Pokemon } from "./Pokemon.js";

export class Player {

    private id : number;
    private userName:string;
    private pokemons:Map<number,Pokemon>;
    private energy:number;
    private numberOfPokemon:number;
  
    constructor(userName:string,id:number) {
      this.id = id;
      this.userName = userName;
      this.energy = 100;
      this.numberOfPokemon=5;
    }
    public getId():number{
      return this.id;
    }

    public getUsername():string{
      return this.userName;
    }

    public getPokemons():Map<number,Pokemon>{
      return this.pokemons;
    }

    public addPokemon(pokemon:Pokemon){
      if (this.pokemons.size<=this.numberOfPokemon){
        this.pokemons.set(pokemon.getId(),pokemon);
      }
    }

    public setPokemons(mapPokemons:Map<number,Pokemon>){
      this.pokemons=mapPokemons;
    }

    public getEnergy():number{
      return this.energy;
    }

    public setEnergy(newEnergy:number){
      this.energy=newEnergy;
    }

}