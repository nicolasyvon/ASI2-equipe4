import properties from "../package.json" assert { type: "json" };
import {GameService} from "../services/gameService.js"

const service = new GameService();

const controllers = {
  about: (req, res) => {
    const aboutInfo = {
      name: properties.name,
      version: properties.version,
      description: properties.description,
      author: properties.author
    };
    res.json(aboutInfo);
  },

  createGame:(req,res)=>{
    if (!(service.createGame(req.body))){
      res.status(500).send("Room name is already taken. Choose another");
    }
    else{
      res.send("Game created");
    }
  },

  joinGame:(req,res)=>{
    if(!(service.gameExist(req.body.gameName))){
      res.status(500).send("Room does not exist. Please create it");
    }
    else if(service.isGameFull(req.body.gameName)){
      res.status(500).send("Room is full !");
    }
    else{
      service.joinGame(req.body);
      res.send("Game joined");
    }
  },

  getGames:(req,res)=>{
    let result = service.getAllGames();
    res.send(result);
  },

  getGame:(req,res)=>{
    if (service.gameExist(req.params.gameName)){
      let result = service.getGame(req.body.gameName);
      res.send(result);
    }
    else{
      res.status(500).send("Room does not exist");
    }
  },
  
   choosePokemon:(req,res)=>{
    service.choosePokemon(req.body)
    .then((data)=>{
      res.send(data);
    })
    .catch((err=>{
      res.status(500).send(err);
    }))
   },

  getPokemon:(req,res)=>{
    service.getPokemonById(req.params.idPokemon)
    .then((data)=>{
      res.send(data);
    }
    )
    .catch((err)=>{
      res.status(500).send(err);
    })
  },

  getPokemons:(req,res)=>{
    service.getPokemonsById([1,2,3,4,5])
    .then((data)=>{
      res.send(data);
    })
    .catch((err)=>{
      res.status(500).send(err);
    })
  },

  attack:(req,res)=>{
    service.attack(req.body);
    res.send("ok");
  },

  getIdOtherPlayer:(req,res)=>{
    let result = service.getIdOtherPlayer(req.body);
    res.send(result.toString());
  }

};

export default controllers;
