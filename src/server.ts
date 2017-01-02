import * as express from 'express';
import * as bodyParser from 'body-parser';

import { Route } from './route/route';
import { PingRoute } from './route/ping-route';

class Server {
    public app: express.Application;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(function (err, req, res, next) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });
    }

    private routes(): void {
        let router: express.Router = express.Router();
        this.registerRoute(router, "/ping", new PingRoute());
        this.app.use(router);
    }

    private registerRoute(router: express.Router, url: string, route: Route): void {
        router.get(url, route.get.bind(route.get));
        router.post(url, route.post.bind(route.post));
    }
}

var server = Server.bootstrap();
module.exports = server.app;
