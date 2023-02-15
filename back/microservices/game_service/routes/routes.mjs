import controllers from "../controllers/controller.mjs";

const routes = (app) => {
  app.route("/about").get(controllers.about);
  app.route("/createGame").post(controllers.createGame);
  app.route("/joinGame").post(controllers.joinGame);
  app.route("/getGames").get(controllers.getGames);
  app.route("/getGame/:gameName").get(controllers.getGame);
  app.route("/choosePokemon").post(controllers.choosePokemon);
  app.route("/getPokemon/:idPokemon").get(controllers.getPokemon);
  app.route("/getPokemons").get(controllers.getPokemons);
  app.route("/attack").post(controllers.attack);
  app.route("/getIdOtherPlayer").post(controllers.getIdOtherPlayer);
};

export default routes;