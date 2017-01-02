"use strict";
class Route {
    get(req, res, next) {
        res.status(405).send("GET is not supported on this URL");
    }
    post(req, res, next) {
        res.status(405).send("POST is not supported on this URL");
    }
}
exports.Route = Route;
