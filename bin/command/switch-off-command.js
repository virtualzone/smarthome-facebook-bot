"use strict";
const command_1 = require("./command");
class SwitchOffCommand extends command_1.Command {
    getCommandRegexList() {
        return [
            "turn (.+) off",
            "switch (.+) off",
            "(.+) off",
            "schalte (.+) aus",
            "mach (.+) aus",
            "mache (.+) aus",
            "mach das (.+) aus",
            "mache das (.+) aus",
            "(.+) aus"
        ];
    }
    execute(user, params) {
        let device = params[0];
        return `Okay, I've switched ${device} off.`;
    }
}
exports.SwitchOffCommand = SwitchOffCommand;
