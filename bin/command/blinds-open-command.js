"use strict";
const command_1 = require("./command");
class BlindsOpenCommand extends command_1.Command {
    getCommandRegexList() {
        return [
            "open (.+)",
            "open blind (.+)",
            "(.+) hoch",
            "(.+) öffnen",
            "mache (.+) hoch",
            "mach (.+) hoch",
            "öffne (.+)",
            "fahre (.+) hoch",
            "fahre (.+) nach oben"
        ];
    }
    execute(user, params) {
        return new Promise((resolve) => {
            if (!user.hasBridges()) {
                resolve("Please setup a smart home system first.");
            }
            else {
                let device = user.resolveAlias(params[0]);
                user.getFirstBridge().setBlinds(device, 100);
                resolve(`Okay, I've opened blind ${device}.`);
            }
        });
    }
}
exports.BlindsOpenCommand = BlindsOpenCommand;
