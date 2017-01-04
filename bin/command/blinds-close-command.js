"use strict";
const command_1 = require("./command");
class BlindsCloseCommand extends command_1.Command {
    getCommandRegexList() {
        return [
            "close (.+)",
            "close blind (.+)",
            "(.+) runter",
            "mache (.+) runter",
            "mach (.+) runter",
            "schließe (.+)",
            "fahre (.+) runter",
            "fahre (.+) nach unten"
        ];
    }
    execute(user, params) {
        return new Promise((resolve) => {
            if (!user.hasBridges()) {
                resolve("Please setup a smart home system first.");
            }
            else {
                let device = user.resolveAlias(params[0]);
                user.getFirstBridge().setBlinds(device, 0);
                resolve(`Okay, I've closed blind ${device}.`);
            }
        });
    }
}
exports.BlindsCloseCommand = BlindsCloseCommand;
