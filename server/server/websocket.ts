import {Server} from "ws";

const wsServer = new Server({port: 8085});

wsServer.on("connection", webSocket => {
    webSocket.send("from server ......");
});
