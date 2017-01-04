import * as request from "request";
import { express } from "express";

import { Route } from "./route";
import { Config } from "../util/config";
import { User } from "../model/user";
import { LanguageTools } from "../util/language-tools";
import { CommandExecutor } from "../command/command-executor";

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
            for (let i=0; i<data.entry.length; i++) {
                let entry: any = data.entry[i];
                this.handleEntry(entry);
            }
        }
        res.sendStatus(200);
    }

    private handleEntry(entry: any): void {
        let pageID = entry.id;
        let timeOfEvent = entry.time;
        for (let i=0; i<entry.messaging.length; i++) {
            let event: any = entry.messaging[i];
            this.handleMessage(event);
        }
    }

    private handleMessage(event: any): void {
        let senderID: string = event.sender.id;
        let recipientID: string = event.recipient.id;
        let timeOfMessage: string = event.timestamp;
        let message: any = event.message;
        let id = message.mid;
        let text = message.text;
        let attachments = message.attachments;

        console.log("Received message for user %d and page %d at %d with message:",
                            senderID, recipientID, timeOfMessage);
        this.processText(senderID, text);
    }

    private processText(senderID: string, text: string) {
        if (text) {
            User.loadOrCreate(senderID)
                .then(user => {
                    let commands: string[] = LanguageTools.splitCommands(text);
                    let answers: string[] = new Array();
                    for (let i=0; i<commands.length; i++) {
                        let s: string = commands[i];
                        let response: string = CommandExecutor.execute(user, s);
                        answers.push(response);
                    }
                    this.sendTextMessage(senderID, answers.join(" "));
                });
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
        return config.facebook.pageAccessToken;
    }

    private getVerifyToken(): string {
        let config: any = Config.getInstance().getConfig();
        return config.facebook.verifyToken;
    }
}
