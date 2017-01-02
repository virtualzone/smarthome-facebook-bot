"use strict";
const request = require("request");
const route_1 = require("./route");
const config_1 = require("../config");
class WebhookRoute extends route_1.Route {
    get(req, res, next) {
        if (req.query["hub.mode"] === "subscribe" &&
            req.query["hub.verify_token"] === this.getVerifyToken()) {
            console.log("Validating webhook");
            res.status(200).send(req.query["hub.challenge"]);
        }
        else {
            console.error("Failed validation. Make sure the validation tokens match.");
            res.sendStatus(403);
        }
    }
    post(req, res, next) {
        let data = req.body;
        if (data.object === "page") {
            data.entry.forEach(function (entry) {
                let pageID = entry.id;
                let timeOfEvent = entry.time;
                entry.messaging.forEach(function (event) {
                    if (event.message) {
                        let senderID = event.sender.id;
                        let recipientID = event.recipient.id;
                        let timeOfMessage = event.timestamp;
                        let message = event.message;
                        console.log("Received message for user %d and page %d at %d with message:", senderID, recipientID, timeOfMessage);
                        this.handleMessage(senderID, message);
                    }
                    else {
                        console.log("Webhook received unknown event: ", event);
                    }
                });
            });
        }
        res.sendStatus(200);
    }
    handleMessage(senderID, message) {
        let id = message.mid;
        let text = message.text;
        let attachments = message.attachments;
        if (text) {
            let answer = "Thanks for your message! You wrote: " + text;
            this.sendTextMessage(senderID, answer);
        }
    }
    sendTextMessage(recipientId, text) {
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
    callSendAPI(messageData) {
        request({
            uri: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { access_token: this.getPageAccessToken() },
            method: 'POST',
            json: messageData
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let recipientId = body.recipient_id;
                let messageId = body.message_id;
                console.log("Successfully sent generic message with id %s to recipient %s", messageId, recipientId);
            }
            else {
                console.error("Unable to send message.");
                console.error(response);
                console.error(error);
            }
        });
    }
    getPageAccessToken() {
        let config = config_1.Config.getInstance().getConfig();
        return config.facebook.pageAcccessToken;
    }
    getVerifyToken() {
        let config = config_1.Config.getInstance().getConfig();
        return config.facebook.verifyToken;
    }
}
exports.WebhookRoute = WebhookRoute;
