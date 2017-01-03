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
    switchOn(device) {
        this.sendCommandToDevice(device, "on");
    }
    switchOff(device) {
        this.sendCommandToDevice(device, "off");
    }
    setBlinds(device, level) {
        this.sendCommandToDevice(device, String(level));
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
                throw err;
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
