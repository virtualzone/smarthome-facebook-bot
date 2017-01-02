import * as express from 'express';

import { Route } from './route';
import { PingRoute } from './ping-route';
import { WebhookRoute } from './webhook-route';

export class RouteFactory {
    public static createRouter(): express.Router {
        let router: express.Router = express.Router();
        RouteFactory.registerRoute(router, "/ping", new PingRoute());
        RouteFactory.registerRoute(router, "/webhook", new WebhookRoute());
        return router;
    }

    private static registerRoute(router: express.Router, url: string, route: Route): void {
        console.log("Registering route: %s", url);
        router.get(url, route.get.bind(route));
        router.post(url, route.post.bind(route));
    }
}
