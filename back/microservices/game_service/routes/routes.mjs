import controllers from "../controllers/controller.mjs";

const routes = (app) => {
  app.route("/about").get(controllers.about);
};

export default routes;