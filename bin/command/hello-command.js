"use strict";
const command_1 = require("./command");
class HelloCommand extends command_1.Command {
    getCommandRegexList() {
        return [
            "hello(\s.*)",
            "hallo(\s.*)",
            "guten tag(\s.*)",
            "servus(\s.*)",
            "cheers(\s.*)",
            "hi there(\s.*)",
            "hi(\s.*)",
            "good morning(\s.*)",
            "good day(\s.*)",
            "good afternoon(\s.*)",
            "huhu(\s.*)"
        ];
    }
    execute(user, params) {
        return new Promise((resolve) => {
            resolve("Hello! Nice to have you here. You can talk to me to control your smart home.\n" +
                "To set up your smart home system, type something like: Setup fhem https://my-smarthome:8443/fhem username password\n" +
                "Please ask me for help at any time for a list of commands I understand.");
        });
    }
}
exports.HelloCommand = HelloCommand;
