"use strict";
const command_1 = require("./command");
class DeleteAccountCommand extends command_1.Command {
    getCommandRegexList() {
        return [
            "delete my account",
            "delete account",
            "remove my account",
            "remove account",
            "delete me",
            "delete my settings",
            "delete my preferences",
            "delete my system",
            "delete my smarthome",
            "delete my smart home",
            "delete my home",
            "forget my home",
            "forget me",
            "remove my settings",
            "remove my preferences"
        ];
    }
    execute(user, params) {
        return new Promise((resolve) => {
            resolve("I'd be sad to remove you from my system. " +
                "All settings you've performed will be permanently deleted. " +
                "If you really want remove your data, please text me:\n" +
                "Really forget me now!");
        });
    }
}
exports.DeleteAccountCommand = DeleteAccountCommand;
