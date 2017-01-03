"use strict";
const switch_on_command_1 = require("./switch-on-command");
class CommandExecutor {
    static execute(s, bridge) {
        let cmd = CommandExecutor.selectCommand(s);
        if (cmd != null) {
            let result = cmd.regex.exec(s);
            let params = result.slice(1);
            cmd.command.execute(bridge, params);
        }
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
    new switch_on_command_1.SwitchOnCommand()
];
exports.CommandExecutor = CommandExecutor;
class MatchingCommand {
    constructor(command, regex) {
        this.command = command;
        this.regex = regex;
    }
}
