"use strict";
const command_1 = require("./command");
class BlindsSetCommand extends command_1.Command {
    getCommandRegexList() {
        return [
            "set (.+) to (\\d+) percent",
            "set (.+) to (\\d+) %",
            "set (.+) to (\\d+)%",
            "fahre (.+) auf (\\d+) Prozent",
            "fahre (.+) auf (\\d+) %",
            "fahre (.+) auf (\\d+)%"
        ];
    }
    execute(user, params) {
        return new Promise((resolve) => {
            if (!user.hasBridges()) {
                resolve("Please setup a smart home system first.");
            }
            else {
                let device = user.resolveAlias(params[0]);
                let num = parseInt(params[1]);
                user.getFirstBridge().setBlinds(device, num);
                resolve(`Okay, I've set blind ${device} to ${num}%.`);
            }
        });
    }
}
exports.BlindsSetCommand = BlindsSetCommand;
