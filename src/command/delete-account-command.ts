import { Command } from "./command";
import { User } from "../model/user";

export class DeleteAccountCommand extends Command {
    protected getCommandRegexList(): string[] {
        return [
            "delete my account",
            "delete account",
            "remove my account",
            "remove account",
            "delete me",
            "delete my settings",
            "delete my preferences",
            "delete my system",
            "delete my smarthome",
            "delete my smart home",
            "delete my home",
            "forget my home",
            "forget me",
            "remove my settings",
            "remove my preferences"
        ];
    }

    public execute(user: User, params: string[]): Promise<string> {
        return new Promise((resolve) => {
            resolve("I'd be sad to remove you from my system. " +
                "All settings you've performed will be permanently deleted. " +
                "If you really want remove your data, please text me:\n" +
                "Really forget me now!");
        });
    }
}
