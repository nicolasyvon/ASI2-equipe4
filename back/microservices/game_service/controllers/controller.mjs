import GameService from "../services/game_service.mjs";
import properties from "../package.json" assert { type: "json" };

const service = new GameService();

const controllers = {
  about: (req, res) => {
    const aboutInfo = {
      name: properties.name,
      version: properties.version,
    };
    res.json(aboutInfo);
  },
};

export default controllers;
