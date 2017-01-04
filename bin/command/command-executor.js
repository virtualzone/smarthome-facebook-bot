"use strict";
const hello_command_1 = require("./hello-command");
const setup_command_1 = require("./setup-command");
const switch_on_command_1 = require("./switch-on-command");
const switch_off_command_1 = require("./switch-off-command");
const blinds_open_command_1 = require("./blinds-open-command");
const blinds_close_command_1 = require("./blinds-close-command");
const blinds_set_command_1 = require("./blinds-set-command");
const alias_add_command_1 = require("./alias-add-command");
const alias_remove_command_1 = require("./alias-remove-command");
const delete_account_confirmed_command_1 = require("./delete-account-confirmed-command");
const delete_account_command_1 = require("./delete-account-command");
const help_command_1 = require("./help-command");
class CommandExecutor {
    static execute(user, s) {
        return new Promise((resolve) => {
            let response;
            let cmd = CommandExecutor.selectCommand(s);
            if (cmd != null) {
                let result = cmd.regex.exec(s);
                let params = result.slice(1);
                cmd.command.execute(user, params).then(res => resolve(res));
            }
            else {
                resolve("Sorry, I didn't get that. Can you try to say that in other words?");
            }
        });
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
    new hello_command_1.HelloCommand(),
    new setup_command_1.SetupCommand(),
    new switch_on_command_1.SwitchOnCommand(),
    new switch_off_command_1.SwitchOffCommand(),
    new blinds_open_command_1.BlindsOpenCommand(),
    new blinds_close_command_1.BlindsCloseCommand(),
    new blinds_set_command_1.BlindsSetCommand(),
    new alias_add_command_1.AliasAddCommand(),
    new alias_remove_command_1.AliasRemoveCommand(),
    new delete_account_confirmed_command_1.DeleteAccountConfirmedCommand(),
    new delete_account_command_1.DeleteAccountCommand(),
    new help_command_1.HelpCommand()
];
exports.CommandExecutor = CommandExecutor;
class MatchingCommand {
    constructor(command, regex) {
        this.command = command;
        this.regex = regex;
    }
}
