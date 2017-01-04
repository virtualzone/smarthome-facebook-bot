import { User } from "../model/user";
import { Command } from "./command";
import { SwitchOnCommand } from "./switch-on-command";
import { SwitchOffCommand } from "./switch-off-command";
import { SetupCommand } from "./setup-command";
import { HelloCommand } from "./hello-command";

export class CommandExecutor {
    private static COMMANDS: Command[] = [
        new SwitchOnCommand(),
        new SwitchOffCommand(),
        new SetupCommand(),
        new HelloCommand()
    ];

    public static execute(user: User, s: string): Promise<string> {
        return new Promise((resolve) => {
            let response: string;
            let cmd: MatchingCommand = CommandExecutor.selectCommand(s);
            if (cmd != null) {
                let result: RegExpExecArray = cmd.regex.exec(s);
                let params: string[] = result.slice(1);
                cmd.command.execute(user, params).then(res => resolve(res));
            } else {
                resolve("Sorry, I didn't get that. Can you try to say that in other words?");
            }
        });
    }

    private static selectCommand(s: string): MatchingCommand {
        for (let i=0; i<CommandExecutor.COMMANDS.length; i++) {
            let cmd: Command = CommandExecutor.COMMANDS[i];
            let regex: RegExp = cmd.matches(s);
            if (regex != null) {
                return new MatchingCommand(cmd, regex);
            }
        }
        return null;
    }
}

class MatchingCommand {
    public command: Command;
    public regex: RegExp;

    constructor(command: Command, regex: RegExp) {
        this.command = command;
        this.regex = regex;
    }
}
