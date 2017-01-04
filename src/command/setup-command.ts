import { Command } from "./command";
import { User } from "../model/user";

export class SetupCommand extends Command {
    protected getCommandRegexList(): string[] {
        return [
            "setup (.+) (.+) (.+) (.+)",
            "setup (.+) (.+)",
            "set up (.+) (.+) (.+) (.+)",
            "setup (.+) (.+)",
            "add (.+) (.+) (.+) (.+)",
            "add (.+) (.+)"
        ];
    }

    public execute(user: User, params: string[]): string {
        let system: string = params[0].toLowerCase();
        if (system !== "fhem" && system !== "test") {
            return "I'm sorry! I can't work with that system yet. I currently can talk with: fhem";
        }
        let url: string = params[1];
        let username: string = (params.length == 4 ? params[2] : "");
        let password: string = (params.length == 4 ? params[3] : "");
        if (system === "test") {
            return this.setupTest(url, username, password);
        } else if (system === "fhem") {
            return this.setupFhem(url, username, password);
        }
    }

    private setupTest(url: string, username: string, password: string): string {
        return "Simulated setup of url=" + url + "; username=" + username + "; password=" + password;
    }

    private setupFhem(url: string, username: string, password: string): string {
        return "Okay, I've set your smart home system up. You should be able to control it now by talking with me. " +
            "Ask me for help if you don't know what to say ;-)";
    }
}
