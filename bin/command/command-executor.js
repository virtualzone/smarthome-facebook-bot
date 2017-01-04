"use strict";
const switch_on_command_1 = require("./switch-on-command");
const switch_off_command_1 = require("./switch-off-command");
const setup_command_1 = require("./setup-command");
const hello_command_1 = require("./hello-command");
class CommandExecutor {
    static execute(user, s) {
        let response;
        let cmd = CommandExecutor.selectCommand(s);
        if (cmd != null) {
            let result = cmd.regex.exec(s);
            let params = result.slice(1);
            response = cmd.command.execute(user, params);
        }
        else {
            response = "Sorry, I didn't get that. Can you try to say that in other words?";
        }
        return response;
    }
    static selectCommand(s) {
        for (let i = 0; i < CommandExecutor.COMMANDS.length; i++) {
            let cmd = CommandExecutor.COMMANDS[i];
            let regex = cmd.matches(s);
            if (regex != null) {
                return new MatchingCommand(cmd, regex);
            }
        }
        return null;
    }
}
CommandExecutor.COMMANDS = [
    new switch_on_command_1.SwitchOnCommand(),
    new switch_off_command_1.SwitchOffCommand(),
    new setup_command_1.SetupCommand(),
    new hello_command_1.HelloCommand()
];
exports.CommandExecutor = CommandExecutor;
class MatchingCommand {
    constructor(command, regex) {
        this.command = command;
        this.regex = regex;
    }
}
