import { express } from 'express';

export abstract class Route {
    public get(req: express.Request, res: express.Response, next: express.NextFunction): void {
        res.status(405).send("GET is not supported on this URL");
    }

    public post(req: express.Request, res: express.Response, next: express.NextFunction): void {
        res.status(405).send("POST is not supported on this URL");
    }
}