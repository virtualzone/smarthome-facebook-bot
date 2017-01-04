import { Command } from "./command";
import { User } from "../model/user";

export class AliasAddCommand extends Command {
    protected getCommandRegexList(): string[] {
        return [
            "add alias \"(.+)\" for \"(.+)\"",
            "add alias '(.+)' for '(.+)'",
            "add alias (.+) for (.+)",
        ];
    }

    public execute(user: User, params: string[]): Promise<string> {
        return new Promise((resolve) => {
            let alias: string = params[0];
            let device: string = params[1];
            if (alias.trim() === "" || device.trim() === "") {
                resolve("Please tell me both the alias and the original device name.");
            } else {
                user.addAlias(alias, device);
                user.save();
                resolve(`Okay, I've added the alias. If you say '${alias}', I'll know that you mean '${device}'.`);
            }
        });
    }
}
