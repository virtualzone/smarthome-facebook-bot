"use strict";
const command_1 = require("./command");
class AliasAddCommand extends command_1.Command {
    getCommandRegexList() {
        return [
            "add alias \"(.+)\" for \"(.+)\"",
            "add alias '(.+)' for '(.+)'",
            "add alias (.+) for (.+)",
        ];
    }
    execute(user, params) {
        return new Promise((resolve) => {
            let alias = params[0];
            let device = params[1];
            if (alias.trim() === "" || device.trim() === "") {
                resolve("Please tell me both the alias and the original device name.");
            }
            else {
                user.addAlias(alias, device);
                user.save();
                resolve(`Okay, I've added the alias. If you say '${alias}', I'll know that you mean '${device}'.`);
            }
        });
    }
}
exports.AliasAddCommand = AliasAddCommand;
