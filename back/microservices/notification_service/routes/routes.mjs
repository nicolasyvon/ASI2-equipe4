import controllers from '../controllers/controller.mjs'

const routes = (app) => {
    app.route('/about').get(controllers.about);
    app.route('/notifyUser').post(controllers.notifyUser);
    app.route('/usersConnected').get(controllers.usersConnected);
}

export default routes;