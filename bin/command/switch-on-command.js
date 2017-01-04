"use strict";
const command_1 = require("./command");
class SwitchOnCommand extends command_1.Command {
    getCommandRegexList() {
        return [
            "turn (.+) on",
            "switch (.+) on",
            "(.+) on",
            "schalte (.+) an",
            "schalte (.+) ein",
            "mach (.+) an",
            "mache (.+) an",
            "mach das (.+) an",
            "mache das (.+) an",
            "(.+) an"
        ];
    }
    execute(user, params) {
        return new Promise((resolve) => {
            if (!user.hasBridges()) {
                resolve("Please setup a smart home system first.");
            }
            else {
                let device = user.resolveAlias(params[0]);
                user.getFirstBridge().switchOn(device);
                resolve(`Okay, I've switched ${device} on.`);
            }
        });
    }
}
exports.SwitchOnCommand = SwitchOnCommand;
