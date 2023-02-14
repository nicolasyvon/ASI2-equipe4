import controllers from "../controllers/controller.mjs";

const routes = (app) => {
  app.route("/about").get(controllers.about);
  app.route("/sendMessage").post(controllers.sendMessage);
  app.route("/createRoom").post(controllers.createRoom);
  app.route("/joinRoom").post(controllers.joinRoom);
};

export default routes;