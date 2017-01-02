"use strict";
const express = require("express");
const ping_route_1 = require("./ping-route");
const webhook_route_1 = require("./webhook-route");
class RouteFactory {
    static createRouter() {
        let router = express.Router();
        RouteFactory.registerRoute(router, "/ping", new ping_route_1.PingRoute());
        RouteFactory.registerRoute(router, "/webhook", new webhook_route_1.WebhookRoute());
        return router;
    }
    static registerRoute(router, url, route) {
        console.log("Registering route: %s", url);
        router.get(url, route.get.bind(route));
        router.post(url, route.post.bind(route));
    }
}
exports.RouteFactory = RouteFactory;
