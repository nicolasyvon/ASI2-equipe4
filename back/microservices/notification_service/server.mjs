import express from "express";
import routes from "./routes/routes.mjs";
import { createServer } from "http";
import { Server } from "socket.io";
import notification_service from "./services/notification_service.mjs";

const app = express();

app.use(express.json());
routes(app);
const server = createServer(app);
const ioServer = new Server(server);

const service = notification_service.getInstance(ioServer);
service.setServer(ioServer,{transports: ['websocket']});


ioServer.on('connection', function(socket) {
    console.log("################ SOCKET CONFIGURATION ################");
    socket.on("userJoined", (userID)=>{
        service.userConnection(socket, userID);
        console.log("user:"+userID+" joined room");
    })
});

server.listen(process.env.NOTIFICATION_DOCKER_PORT);
