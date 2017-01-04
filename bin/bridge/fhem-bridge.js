"use strict";
const request = require("request");
const bridge_1 = require("./bridge");
class FhemBridge extends bridge_1.SmartHomeBridge {
    constructor() {
        super();
    }
    parseConfig(config) {
        this.fhemUrl = config.fhemUrl;
        this.username = config.username;
        this.password = config.password;
    }
    getConfig() {
        return {
            type: "fhem",
            fhemUrl: this.fhemUrl,
            username: this.username,
            password: this.password
        };
    }
    switchOn(device) {
        this.sendCommandToDevice(device, "on");
    }
    switchOff(device) {
        this.sendCommandToDevice(device, "off");
    }
    setBlinds(device, level) {
        this.sendCommandToDevice(device, String(level));
    }
    checkConnection() {
        return new Promise((resolve) => {
            request
                .get(this.fhemUrl, (err, response) => {
                if (err) {
                    resolve(false);
                    return;
                }
                if (!response || (response.statusCode >= 400 && response.statusCode <= 599)) {
                    resolve(false);
                    return;
                }
                resolve(true);
            })
                .auth(this.username, this.password, true);
        });
    }
    sendCommandToDevice(device, action) {
        let cmd = `set ${device} ${action}`;
        console.log("Sending %s to %s", cmd, this.fhemUrl);
        let payload = {
            cmd: cmd
        };
        request
            .post(this.fhemUrl, (err, response, body) => {
            if (err) {
                console.error("Error: Received error while sending command to %s", this.fhemUrl);
            }
            if (response.statusCode >= 400 && response.statusCode <= 599) {
                console.error("Error: Received HTTP Status %d from %s", response.statusCode, this.fhemUrl);
            }
        })
            .form(payload)
            .auth(this.username, this.password, true);
    }
}
exports.FhemBridge = FhemBridge;
