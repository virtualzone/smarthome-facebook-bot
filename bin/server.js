"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const config_1 = require("./config");
const bridge_factory_1 = require("./bridge/bridge-factory");
const route_factory_1 = require("./route/route-factory");
class Server {
    static bootstrap() {
        return new Server();
    }
    constructor() {
        this.app = express();
        this.config();
        this.bridges();
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
    bridges() {
        let config = config_1.Config.getInstance();
        let bridgeConfigs = config.getConfig().bridges;
        bridge_factory_1.BridgeFactory.createBridges(bridgeConfigs);
    }
    routes() {
        let router = route_factory_1.RouteFactory.createRouter();
        this.app.use(router);
    }
}
var server = Server.bootstrap();
module.exports = server.app;
