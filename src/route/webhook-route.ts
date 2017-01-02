import * as request from "request";
import { express } from 'express';

import { Route } from "./route";
import { Config } from "../config";

export class WebhookRoute extends Route {
    public get(req: express.Request, res: express.Response, next: express.NextFunction): void {
        if (req.query["hub.mode"] === "subscribe" &&
            req.query["hub.verify_token"] === this.getVerifyToken()) {
            console.log("Validating webhook");
            res.status(200).send(req.query["hub.challenge"]);
        } else {
            console.error("Failed validation. Make sure the validation tokens match.");
            res.sendStatus(403);
        }
    }

    public post(req: express.Request, res: express.Response, next: express.NextFunction): void {
        let data = req.body;
        if (data.object === "page") {
            data.entry.forEach(function(entry: any) {
                let pageID = entry.id;
                let timeOfEvent = entry.time;
                entry.messaging.forEach(function(event: any) {
                    if (event.message) {
                        let senderID: string = event.sender.id;
                        let recipientID: string = event.recipient.id;
                        let timeOfMessage: string = event.timestamp;
                        let message: any = event.message;
                        console.log("Received message for user %d and page %d at %d with message:",
                            senderID, recipientID, timeOfMessage);
                        this.handleMessage(senderID, message);
                    } else {
                        console.log("Webhook received unknown event: ", event);
                    }
                });
            });
        }
        res.sendStatus(200);
    }

    private handleMessage(senderID: string, message: any): void {
        let id = message.mid;
        let text = message.text;
        let attachments = message.attachments;
        if (text) {
            let answer = "Thanks for your message! You wrote: " + text;
            this.sendTextMessage(senderID, answer);
        }
    }

    private sendTextMessage(recipientId: string, text: string) {
        let messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                text: text
            }
        };
        this.callSendAPI(messageData);
    }

    private callSendAPI(messageData): void {
        request(
            {
                uri: 'https://graph.facebook.com/v2.6/me/messages',
                qs: { access_token: this.getPageAccessToken() },
                method: 'POST',
                json: messageData
            }, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                let recipientId = body.recipient_id;
                let messageId = body.message_id;
                console.log("Successfully sent generic message with id %s to recipient %s", messageId, recipientId);
            } else {
                console.error("Unable to send message.");
                console.error(response);
                console.error(error);
            }
        });
    }

    private getPageAccessToken(): string {
        let config: any = Config.getInstance().getConfig();
        return config.facebook.pageAcccessToken;
    }

    private getVerifyToken(): string {
        let config: any = Config.getInstance().getConfig();
        return config.facebook.verifyToken;
    }
}
