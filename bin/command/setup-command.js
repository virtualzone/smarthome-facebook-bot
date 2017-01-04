"use strict";
const command_1 = require("./command");
class SetupCommand extends command_1.Command {
    getCommandRegexList() {
        return [
            "setup (.+) (.+) (.+) (.+)",
            "setup (.+) (.+)",
            "set up (.+) (.+) (.+) (.+)",
            "setup (.+) (.+)",
            "add (.+) (.+) (.+) (.+)",
            "add (.+) (.+)"
        ];
    }
    execute(user, params) {
        let system = params[0].toLowerCase();
        if (system !== "fhem" && system !== "test") {
            return "I'm sorry! I can't work with that system yet. I currently can talk with: fhem";
        }
        let url = params[1];
        let username = (params.length == 4 ? params[2] : "");
        let password = (params.length == 4 ? params[3] : "");
        if (system === "test") {
            return this.setupTest(url, username, password);
        }
        else if (system === "fhem") {
            return this.setupFhem(url, username, password);
        }
    }
    setupTest(url, username, password) {
        return "Simulated setup of url=" + url + "; username=" + username + "; password=" + password;
    }
    setupFhem(url, username, password) {
        return "Okay, I've set your smart home system up. You should be able to control it now by talking with me. " +
            "Ask me for help if you don't know what to say ;-)";
    }
}
exports.SetupCommand = SetupCommand;
