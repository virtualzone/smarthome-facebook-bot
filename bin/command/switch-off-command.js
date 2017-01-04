"use strict";
const command_1 = require("./command");
class SwitchOffCommand extends command_1.Command {
    getCommandRegexList() {
        return [
            "turn (.+) off",
            "turn off (.+)",
            "switch (.+) off",
            "switch off (.+)",
            "(.+) off",
            "schalte (.+) aus",
            "schalte (.+) ab",
            "mach (.+) aus",
            "mache (.+) aus",
            "mach das (.+) aus",
            "mache das (.+) aus",
            "(.+) aus"
        ];
    }
    execute(user, params) {
        return new Promise((resolve) => {
            if (!user.hasBridges()) {
                resolve("Please setup a smart home system first.");
            }
            else {
                let device = user.resolveAlias(params[0]);
                user.getFirstBridge().switchOff(device);
                resolve(`Okay, I've switched ${device} off.`);
            }
        });
    }
}
exports.SwitchOffCommand = SwitchOffCommand;
