import * as express from 'express';
import * as bodyParser from 'body-parser';

import { Config } from './config';
import { BridgeFactory } from './bridge/bridge-factory';

import { RouteFactory } from './route/route-factory';

class Server {
    public app: express.Application;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        this.app = express();
        this.config();
        this.bridges();
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

    private bridges(): void {
        let config: Config = Config.getInstance();
        let bridgeConfigs: any[] = config.getConfig().bridges;
        BridgeFactory.createBridges(bridgeConfigs);
    }

    private routes(): void {
        let router: express.Router = RouteFactory.createRouter();
        this.app.use(router);
    }
}

var server = Server.bootstrap();
module.exports = server.app;
