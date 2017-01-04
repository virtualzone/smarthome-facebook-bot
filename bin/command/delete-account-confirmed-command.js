"use strict";
const command_1 = require("./command");
class DeleteAccountConfirmedCommand extends command_1.Command {
    getCommandRegexList() {
        return [
            "really forget me now"
        ];
    }
    execute(user, params) {
        return new Promise((resolve) => {
            user.delete();
            resolve("Okay, I've removed you and your settings from my database. " +
                "You can text me and set up your system again at any time if you want to.");
        });
    }
}
exports.DeleteAccountConfirmedCommand = DeleteAccountConfirmedCommand;
