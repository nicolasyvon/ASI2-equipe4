import controllers from "../controllers/controller.mjs";

const routes = (app) => {
  app.route("/about").get(controllers.about);
  app.route("/sendMessage").get(controllers.sendMessage);
};

export default routes;