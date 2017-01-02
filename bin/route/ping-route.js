"use strict";
const route_1 = require("./route");
class PingRoute extends route_1.Route {
    get(req, res, next) {
        res.send("Server alive @ " + new Date());
    }
}
exports.PingRoute = PingRoute;
