"use strict";
const command_1 = require("./command");
class AliasRemoveCommand extends command_1.Command {
    getCommandRegexList() {
        return [
            "remove alias \"(.+)\"",
            "remove alias '(.+)'",
            "remove alias (.+)",
        ];
    }
    execute(user, params) {
        return new Promise((resolve) => {
            let alias = params[0];
            if (alias.trim() === "") {
                resolve("Please tell me the alias you'd like to remove.");
            }
            else {
                user.removeAlias(alias);
                user.save();
                resolve(`Okay, I've removed the alias '${alias}'.`);
            }
        });
    }
}
exports.AliasRemoveCommand = AliasRemoveCommand;
