import express from "express";
import routes from "./routes/routes.mjs";

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
routes(app);
//app.listen(process.env.CHAT_DOCKER_PORT);
app.listen(6464)