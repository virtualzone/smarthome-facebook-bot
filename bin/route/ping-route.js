"use strict";
const route_1 = require("./route");
class PingRoute extends route_1.Route {
    get(req, res, next) {
        res.send("Server alive @ " + this.getCurrentTime());
    }
    getCurrentTime() {
        return new Date().toString();
    }
}
exports.PingRoute = PingRoute;
