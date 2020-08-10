"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var wsServer = new ws_1.Server({ port: 8085 });
wsServer.on("connection", function (webSocket) {
    webSocket.send("from server ......");
});
//# sourceMappingURL=websocket.js.map