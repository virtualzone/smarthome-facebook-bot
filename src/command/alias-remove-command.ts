import { Command } from "./command";
import { User } from "../model/user";

export class AliasRemoveCommand extends Command {
    protected getCommandRegexList(): string[] {
        return [
            "remove alias \"(.+)\"",
            "remove alias '(.+)'",
            "remove alias (.+)",
        ];
    }

    public execute(user: User, params: string[]): Promise<string> {
        return new Promise((resolve) => {
            let alias: string = params[0];
            if (alias.trim() === "") {
                resolve("Please tell me the alias you'd like to remove.");
            } else {
                user.removeAlias(alias);
                user.save();
                resolve(`Okay, I've removed the alias '${alias}'.`);
            }
        });
    }
}
