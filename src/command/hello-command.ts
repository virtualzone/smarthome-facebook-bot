import { Command } from "./command";
import { User } from "../model/user";

export class HelloCommand extends Command {
    protected getCommandRegexList(): string[] {
        return [
            "hello(\s.*)",
            "hallo(\s.*)",
            "guten tag(\s.*)",
            "servus(\s.*)",
            "cheers(\s.*)",
            "hi there(\s.*)",
            "hi(\s.*)",
            "good morning(\s.*)",
            "good day(\s.*)",
            "good afternoon(\s.*)",
            "huhu(\s.*)"
        ];
    }

    public execute(user: User, params: string[]): string {
        return "Hello! Nice to have you here. You can talk to me to control your smart home.\n" +
            "To set up your smart home system, type something like: Setup fhem https://my-smarthome:8443/fhem username password\n" +
            "Please ask me for help at any time for a list of commands I understand.";
    }
}
