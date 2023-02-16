import axios from "axios";
import {Game} from "../model/GameModel/Game.js";
import { Player } from "../model/GameModel/Player.js";
import { Pokemon } from "../model/GameModel/Pokemon.js";
import {CreateOrJoin} from "../model/RequestModel/CreateOrJoin.js";
import { ChoosePokemon } from "../model/RequestModel/ChoosePokemon.js";
import { Attack } from "model/RequestModel/Attack.js";
import { GetIdOtherPlayer } from "../model/RequestModel/GetIdOtherPlayer.js"

export class GameService {

  games:Map<string,Game>= new Map<string,Game>();

  constructor() {
  }

  public gameExist(gameName:string):boolean{
    return this.games.has(gameName);
  }

  public isGameFull(gameName:string):boolean{
    let ret = true;
    let game = this.games.get(gameName);
    if (game!=undefined){
      ret=game.isGameFull();
    }
    return ret;
  }

  public createGame(body:CreateOrJoin):boolean{
    let ret = false;
    if(!this.gameExist(body.gameName)){
      let player = new Player(body.userName,body.id);
      let game = new Game(body.gameName,player);
      this.games.set(body.gameName,game);
      let createRoomBody = {
        "roomName":game.getGameName(),
        "player":player.getId()
      };
      axios
        .post(
          `http://chat-service:${process.env.CHAT_DOCKER_PORT}/createRoom`,
          createRoomBody
        )
        .catch((err) => {
          throw new Error(err);
        });
      ret = true;
    }
    return ret;    
  }

  public joinGame(body:CreateOrJoin){
    let player = new Player(body.userName,body.id);
    let game = this.games.get(body.gameName);
    if (game!=undefined){
      game.addPlayer(player);
      this.games.delete(body.gameName);
      this.games.set(game.getGameName(),game);
      let gameSend = this.getGame(game.getGameName());
      this.notifyGame(game,gameSend,"joinGame");
      let joinRoomBody = {
        "roomName":game.getGameName(),
        "player":player.getId()
      };
      axios
        .post(
          `http://chat-service:${process.env.CHAT_DOCKER_PORT}/joinRoom`,
          joinRoomBody
        )
        .catch((err) => {
          throw new Error(err);
      });
    }
  }

  public getPlayersInGame(gameName:string){
    let players:Object[]=[];
    if(this.gameExist(gameName)){
      let game = this.games.get(gameName);
      let mapPlayers = game!["players"];
      if(mapPlayers!=undefined){
        for (let value of mapPlayers.values()){
          let player = {};
          let pokemons:Object[] = this.getPokemonsOfPlayer(gameName,value.getId());
          player["id"]=value.getId();
          player["userName"]=value.getUsername();
          player["energy"]=value.getEnergy();
          player["pokemons"]=pokemons;
          players.push(player);
        }
      }
    }
    return players;
  }

  public getPokemonsOfPlayer(gameName:string,id:number):Object[]{
    let pokemons:Object[]=[];
    if(this.gameExist(gameName)){
      let game = this.games.get(gameName);
      let mapPlayers = game!["players"];
      let player = mapPlayers.get(id);
      let mapPokemons = player!["pokemons"];
      if(mapPokemons!=undefined){
        for(let value of mapPokemons.values()){
          let pokemon = {};
          pokemon["id"]=value.getId();
          pokemon["name"]=value.getName();
          pokemon["description"]=value.getDescription();
          pokemon["family"]=value.getFamily();
          pokemon["affinity"]=value.getAffinity();
          pokemon["imgUrl"]=value.getImgUrl();
          pokemon["smallImgUrl"]=value.getSmallImgUrl();
          pokemon["energy"]=value.getEnergy();
          pokemon["hp"]=value.getHp();
          pokemon["defense"]=value.getDefense();
          pokemon["attack"]=value.getAttack();
          pokemon["price"]=value.getPrice();
          pokemon["userId"]=value.getUserId();
          pokemons.push(pokemon);
        }
      }
    }
    return pokemons;
  }

  // public getPokemonsOfPlayer(gameName:string,id:number):[Object]{
  //   let pokemons:[Object]=[{}];
  //   if(this.gameExist(gameName)){
  //     let game = this.games.get(gameName);
  //     let mapPokemons = game!["pokemons"];
  //     if(mapPokemons!=undefined){
  //       for(let value of mapPokemons.values()){
  //         let pokemon = {};
  //         pokemon["id"]=value.getId();
  //         pokemon["name"]=value.getName();
  //         pokemon["description"]=value.getDescription();
  //         pokemon["family"]=value.getFamily();
  //         pokemon["affinity"]=value.getAffinity();
  //         pokemon["imgUrl"]=value.getImgUrl();
  //         pokemon["smallImgUrl"]=value.getSmallImgUrl();
  //         pokemon["energy"]=value.getEnergy();
  //         pokemon["hp"]=value.getHp();
  //         pokemon["defense"]=value.getDefense();
  //         pokemon["attack"]=value.getAttack();
  //         pokemon["price"]=value.getPrice();
  //         pokemon["userId"]=value.getUserId();
  //         if(value.getUserId()==id){
  //           pokemons.push(pokemon);
  //         }
  //       }
  //     }
  //   }
  //   return pokemons;
  // }

  public getGame(gameName:string){
    let game={}
    // let pokemon1:Object[];
    // let pokemon2:Object[];
    if(this.gameExist(gameName)){
      game["gameName"]=gameName;
      game["players"]=this.getPlayersInGame(gameName);
      // pokemon1=this.getPokemonsOfPlayer(gameName,game["players"][0]["id"]);
      // pokemon2=this.getPokemonsOfPlayer(gameName,game["players"][1]["id"]);
      // game["pokemons"]=pokemon1.concat(pokemon2);
    }
    return game;
  }

  public getAllGames(){
    let listGames:Object[]=[];
    for (let value of this.games.values()){
      let game = {};
      game=this.getGame(value.getGameName());
      listGames.push(game);
    }
    return listGames;
  }

  public async updateGame(gameUpdate:Game):Promise<Boolean>{
    let ret = false;
    if (this.gameExist(gameUpdate.getGameName())){
      ret = true;
      this.games.delete(gameUpdate.getGameName());
      this.games.set(gameUpdate.getGameName(),gameUpdate);
    }
    return ret;
   }

  public async getPokemonById(idPokemon:number):Promise<Pokemon>{
    let pokemon : Pokemon;
    const response = await fetch(`http://user-service:${process.env.USER_DOCKER_PORT}/card/`+idPokemon.toString(),{
      method: "GET",
      headers:{
        'Content-Type': 'application/json'
      }
    })
    if (response.ok){
      let data = await response.json();
      pokemon = new Pokemon(data.id,data.name,data.description,data.family,
                            data.affinity,data.imgUrl,data.smallImgUrl,data.energy,
                            data.hp,data.defense,data.attack,data.price,data.userId);
    }
    else{
      pokemon = new Pokemon(0,"","","","","","",0,0,0,0,0,0);
    }
    return pokemon;
  }

  public async getPokemonsById(listIdPokemons:number[]):Promise<Map<number,Pokemon>>{
    let n = listIdPokemons.length;
    let mapPokemons:Map<number,Pokemon>=new Map();
    let urls:string[] = [];
    for(let i=0;i<n;i++){
      let url = `http://user-service:${process.env.USER_DOCKER_PORT}/card/`+listIdPokemons[i].toString();
      urls.push(url);
    }
    const promises = urls.map(url => fetch(url,{
      method: "GET",
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()));

    mapPokemons = await Promise.all(promises)
    .then(results => {
      let mapPokemonsTemp:Map<number,Pokemon>=new Map();
      // let pokemonTemp = new Pokemon(0,"","","","","","",0,0,0,0,0,0);
      // mapPokemonsTemp.set(0,pokemonTemp);
      let p = results.length;
      for(let i=0;i<p;i++){
        let pokemon = new Pokemon(results[i].id,results[i].name,results[i].description,results[i].family,
            results[i].affinity,results[i].imgUrl,results[i].smallImgUrl,results[i].energy,
            results[i].hp,results[i].defense,results[i].attack,results[i].price,results[i].userId);
            mapPokemonsTemp.set(results[i]["id"],pokemon);
      }
      return(mapPokemonsTemp)
    })
    return(mapPokemons);
  }


  public async choosePokemon(body:ChoosePokemon){
    let game = this.games.get(body.gameName);
    let player = game?.getPlayer(body.id);
    let otherPlayerId = game?.getOtherPlayerId(body.id);
    this.getPokemonsById(body.pokemonsId)
    .then((data)=>{
      data.delete(0);
      player?.setPokemons(data!);
      game?.updatePlayer(player!);
      this.updateGame(game!)
      .then(()=>{
        let sendGame=this.getGame(game!.getGameName());
        this.notifyUser(otherPlayerId!,sendGame,"choosePokemon");
      }
      )
    }
    )
  }

  public attack(body:Attack){
    let game = this.games.get(body.gameName);
    let attacker = game?.getPlayer(body.attackerId);
    let defender = game?.getPlayer(body.defenderId);
    let pokemonAttacker = attacker?.getPokemonById(body.pokemonAttackerId);
    let pokemonDefender = defender?.getPokemonById(body.pokemonDefenderId);


    let newHpPokemonDefender = pokemonDefender?.getHp()! - pokemonAttacker?.getAttack()!;
    let newEnergyAttacker = attacker?.getEnergy()! - pokemonAttacker?.getAttack()!;


    pokemonDefender?.setHp(newHpPokemonDefender);
    attacker?.setEnergy(newEnergyAttacker);
    
    defender?.updatePokemon(pokemonDefender!);

    game?.updatePlayer(defender!);
    game?.updatePlayer(attacker!);
    this.updateGame(game!);
    let gameSend = this.getGame(game!.getGameName());
    this.notifyGame(game,gameSend,"gameState");
    this.victory(game!);
  }

  victory(game:Game){
    let players = game.getPlayers();
    for (let player of players.values()){
      let pokemons:Map<number,Pokemon> = player.getPokemons();
      let numberOfPokemonDead = 0;
      for (let pokemon of pokemons.values()){
        if (pokemon.getHp()<=0){
          numberOfPokemonDead+=1;
        };
      }
      if(numberOfPokemonDead == pokemons.size){
        this.notifyGame(game,player.getUsername(),"looser");
        this.deleteGame(game.getGameName());
      };
    };
  }

  getIdOtherPlayer(me:GetIdOtherPlayer):number{
    let game = this.games.get(me.gameName);
    let idOtherPlayer=-1;
    if(game!=undefined){
      idOtherPlayer = game.getOtherPlayerId(me.myId);
    }
    return idOtherPlayer;
  }


  deleteGame(gameName:string){
    this.games.delete(gameName);
  }

  notifyUser(userId:number,data,event:string){
    let body = { event: event, data: data, dest: userId };
    axios
        .post(
          `http://notification-service:${process.env.NOTIFICATION_DOCKER_PORT}/notifyUser`,
          body
        )
        .catch((err) => {
          throw new Error(err);
    });
  }


  notifyGame(game, data, event) {
    Array.from(game.getPlayers().keys()).forEach((user) => {
      let body = { event: event, data: data, dest: user };
      axios
        .post(
          `http://notification-service:${process.env.NOTIFICATION_DOCKER_PORT}/notifyUser`,
          body
        )
        .catch((err) => {
          throw new Error(err);
        });
    });
  }

}
