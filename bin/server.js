"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const database_1 = require("./util/database");
const route_factory_1 = require("./route/route-factory");
class Server {
    static bootstrap() {
        return new Server();
    }
    constructor() {
        this.app = express();
        this.config();
        database_1.Database.connect()
            .then(() => {
            this.routes();
        })
            .catch(err => {
            throw err;
        });
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
        let router = route_factory_1.RouteFactory.createRouter();
        this.app.use(router);
    }
}
var server = Server.bootstrap();
module.exports = server.app;
