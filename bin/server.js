"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const ping_route_1 = require("./route/ping-route");
class Server {
    static bootstrap() {
        return new Server();
    }
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(function (err, req, res, next) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });
    }
    routes() {
        let router = express.Router();
        this.registerRoute(router, "/ping", new ping_route_1.PingRoute());
        this.app.use(router);
    }
    registerRoute(router, url, route) {
        router.get(url, route.get.bind(route.get));
        router.post(url, route.post.bind(route.post));
    }
}
var server = Server.bootstrap();
module.exports = server.app;
