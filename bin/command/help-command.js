"use strict";
const command_1 = require("./command");
class HelpCommand extends command_1.Command {
    getCommandRegexList() {
        return [
            "help me",
            "what can i say",
            "what do you understand",
            "show me your commands",
            "tell me about your commands",
            "which commands do you understand",
            "how to use you",
            "how to talk to you",
            "do you understand me",
            "help",
            "hilf mir",
            "was verstehst du",
            "was kannst du",
            "welche befehle verstehst du",
            "welche kommandos verstehst du",
            "hilfe"
        ];
    }
    execute(user, params) {
        return new Promise((resolve) => {
            resolve("You can use the following commands when talking to me. I understand some variants of them:\n" +
                this.getHelpEntries().join("\n"));
        });
    }
    getHelpEntries() {
        return [
            "* setup <system> <url> <username> <password>",
            "* switch <device> on",
            "* switch <device> off",
            "* open <device>",
            "* close <device>",
            "* set <device> to <percentage>",
            "* add alias <alias> for <device>",
            "* remove alias <alias>"
        ];
    }
}
exports.HelpCommand = HelpCommand;
