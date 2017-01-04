import * as express from 'express';
import * as bodyParser from 'body-parser';

import { Config } from './util/config';
import { Database } from './util/database';
import { RouteFactory } from './route/route-factory';

class Server {
    public app: express.Application;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        this.app = express();
        this.config();
        Database.connect()
            .then(() => {
                this.routes();
            })
            .catch(err => {
                throw err;
            });
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
        let router: express.Router = RouteFactory.createRouter();
        this.app.use(router);
    }
}

var server = Server.bootstrap();
module.exports = server.app;
