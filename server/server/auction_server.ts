import * as express from "express";
import {products} from "./product";
import {comments} from "./comment";
const {Server} = require('ws');

const app = express();

app.get('/', (req,res) => {
    res.send('Hello Express');
})

app.get('/products', function (req, res) {
    let result = products;
    const params = req.query;
    if(params.title) {
        result = result.filter(product => product.title.toLowerCase().indexOf(params.title.toLocaleString()) !== -1);
    }
    if(params.price  && result.length > 0) {
        const price = parseInt(params.price);
        result = result.filter(product => product.price >= price );
    }
    if(params.category && params.category !== '-1' && result.length > 0) {
        result = result.filter(product => product.categories.indexOf(params.category) !== -1);
    }
    res.json(result);
});

app.get('/products/:id', function (req, res) {
    return res.json(products.find((product) => product.id == req.params.id));
})

app.get('/products/:id/comments', function (req, res) {
    return res.json(comments.filter((comment) => comment.productId == req.params.id));
})

const server = app.listen(8000, "localhost", (req, res) => {
    console.log("server start ...")
})

const subscriptions = new Map<any, number[]>()
const wsServer = new Server({port: 8085});

wsServer.on("connection", websocket => {
    websocket.on("message", message => {
        console.log("message receive: " + message);
        let messageObj = JSON.parse(message);
        let productIds = subscriptions.get(websocket) || [];
        subscriptions.set(websocket, [...productIds, messageObj.productId]);
    });
})

const currentBids = new Map<number, number>()
setInterval(() => {
    products.forEach(product => {
        let currentBid = currentBids.get(product.id) || product.price;
        let newBid = Math.floor((currentBid + Math.random()) * 100) / 100;
        currentBids.set(product.id, newBid);
    });

    subscriptions.forEach((productIds: number[], ws) => {
        if(ws.readyState === 1) {
            let newBids = productIds.map((pid) => ({
                'productId': pid,
                'bid': currentBids.get(pid)
            }));
            ws.send(JSON.stringify(newBids));
        } else {
            subscriptions.delete(ws);
        }

    });

}, 2000);
