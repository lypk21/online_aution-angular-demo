"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var product_1 = require("./product");
var comment_1 = require("./comment");
var Server = require('ws').Server;
var app = express();
app.get('/', function (req, res) {
    res.send('Hello Express');
});
app.get('/products', function (req, res) {
    var result = product_1.products;
    var params = req.query;
    if (params.title) {
        result = result.filter(function (product) { return product.title.toLowerCase().indexOf(params.title.toLocaleString()) !== -1; });
    }
    if (params.price && result.length > 0) {
        var price_1 = parseInt(params.price);
        result = result.filter(function (product) { return product.price >= price_1; });
    }
    if (params.category && params.category !== '-1' && result.length > 0) {
        result = result.filter(function (product) { return product.categories.indexOf(params.category) !== -1; });
    }
    res.json(result);
});
app.get('/products/:id', function (req, res) {
    return res.json(product_1.products.find(function (product) { return product.id == req.params.id; }));
});
app.get('/products/:id/comments', function (req, res) {
    return res.json(comment_1.comments.filter(function (comment) { return comment.productId == req.params.id; }));
});
var server = app.listen(8000, "agitated-swirles-00fff9.netlify.app", function (req, res) {
    console.log("server start ...");
});
var subscriptions = new Map();
var wsServer = new Server({ port: 8085 });
wsServer.on("connection", function (websocket) {
    websocket.on("message", function (message) {
        console.log("message receive: " + message);
        var messageObj = JSON.parse(message);
        var productIds = subscriptions.get(websocket) || [];
        subscriptions.set(websocket, __spreadArrays(productIds, [messageObj.productId]));
    });
});
var currentBids = new Map();
setInterval(function () {
    product_1.products.forEach(function (product) {
        var currentBid = currentBids.get(product.id) || product.price;
        var newBid = Math.floor((currentBid + Math.random()) * 100) / 100;
        currentBids.set(product.id, newBid);
    });
    subscriptions.forEach(function (productIds, ws) {
        if (ws.readyState === 1) {
            var newBids = productIds.map(function (pid) { return ({
                'productId': pid,
                'bid': currentBids.get(pid)
            }); });
            ws.send(JSON.stringify(newBids));
        }
        else {
            subscriptions.delete(ws);
        }
    });
}, 2000);
//# sourceMappingURL=auction_server.js.map
