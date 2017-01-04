import { Command } from "./command";
import { User } from "../model/user";

export class DeleteAccountConfirmedCommand extends Command {
    protected getCommandRegexList(): string[] {
        return [
            "really forget me now"
        ];
    }

    public execute(user: User, params: string[]): Promise<string> {
        return new Promise((resolve) => {
            user.delete();
            resolve("Okay, I've removed you and your settings from my database. " +
                "You can text me and set up your system again at any time if you want to.");
        });
    }
}
