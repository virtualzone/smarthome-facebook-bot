import { SmartHomeBridge } from "../bridge/bridge";
import { Command } from './command';
import { SwitchOnCommand } from './switch-on-command';

export class CommandExecutor {
    private static COMMANDS: Command[] = [
        new SwitchOnCommand()
    ];

    public static execute(s: string, bridge: SmartHomeBridge): void {
        let cmd: MatchingCommand = CommandExecutor.selectCommand(s);
        if (cmd != null) {
            let result: RegExpExecArray = cmd.regex.exec(s);
            let params: string[] = result.slice(1);
            cmd.command.execute(bridge, params);
        }
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
