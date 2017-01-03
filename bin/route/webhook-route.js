"use strict";
const request = require("request");
const route_1 = require("./route");
const config_1 = require("../config");
const language_tools_1 = require("../util/language-tools");
const command_executor_1 = require("../command/command-executor");
const bridge_factory_1 = require("../bridge/bridge-factory");
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
            for (let i = 0; i < data.entry.length; i++) {
                let entry = data.entry[i];
                this.handleEntry(entry);
            }
        }
        res.sendStatus(200);
    }
    handleEntry(entry) {
        let pageID = entry.id;
        let timeOfEvent = entry.time;
        for (let i = 0; i < entry.messaging.length; i++) {
            let event = entry.messaging[i];
            this.handleMessage(event);
        }
    }
    handleMessage(event) {
        let senderID = event.sender.id;
        let recipientID = event.recipient.id;
        let timeOfMessage = event.timestamp;
        let message = event.message;
        console.log("Received message for user %d and page %d at %d with message:", senderID, recipientID, timeOfMessage);
        let id = message.mid;
        let text = message.text;
        let attachments = message.attachments;
        if (text) {
            let commands = language_tools_1.LanguageTools.splitCommands(text);
            let answers = new Array();
            for (let i = 0; i < commands.length; i++) {
                let s = commands[i];
                let response = command_executor_1.CommandExecutor.execute(s, bridge_factory_1.BridgeFactory.getFirstBridge());
                answers.push(response);
            }
            this.sendTextMessage(senderID, answers.join(" "));
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
        return config.facebook.pageAccessToken;
    }
    getVerifyToken() {
        let config = config_1.Config.getInstance().getConfig();
        return config.facebook.verifyToken;
    }
}
exports.WebhookRoute = WebhookRoute;
