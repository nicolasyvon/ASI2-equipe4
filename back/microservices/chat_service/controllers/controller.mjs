import properties from "../package.json" assert { type: "json" };
import { ChatService } from "../services/ChatService.js"

const service = new ChatService();

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

  sendMessage:(req,res) => {
    service.sendMessage(req.body);
    res.send("ok");
  }

};

export default controllers;
