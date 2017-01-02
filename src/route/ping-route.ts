import { express } from 'express';
import { Route } from "./route";

export class PingRoute extends Route {
    public get(req: express.Request, res: express.Response, next: express.NextFunction): void {
        res.send("Server alive @ " + new Date());
    }
}
