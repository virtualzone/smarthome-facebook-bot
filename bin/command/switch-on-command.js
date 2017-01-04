"use strict";
const command_1 = require("./command");
class SwitchOnCommand extends command_1.Command {
    getCommandRegexList() {
        return [
            "turn (.+) on",
            "switch (.+) on",
            "(.+) on",
            "schalte (.+) an",
            "mach (.+) an",
            "mache (.+) an",
            "mach das (.+) an",
            "mache das (.+) an",
            "(.+) an"
        ];
    }
    execute(user, params) {
        let device = params[0];
        return `Okay, I've switched ${device} on.`;
    }
}
exports.SwitchOnCommand = SwitchOnCommand;
