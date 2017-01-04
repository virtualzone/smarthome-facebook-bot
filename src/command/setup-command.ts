import { Command } from "./command";
import { User } from "../model/user";
import { FhemBridge } from "../bridge/fhem-bridge";

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

    public execute(user: User, params: string[]): Promise<string> {
        return new Promise((resolve) => {
            if (user.hasBridges()) {
                resolve("I'm sorry! I can only handle one smart home system for you. Please remove it first if you want to set up another one.");
            }
            let system: string = params[0].toLowerCase();
            if (system !== "fhem" && system !== "test") {
                resolve("I'm sorry! I can't work with that system yet. I currently can talk with: fhem");
            }
            let url: string = params[1];
            let username: string = (params.length == 4 ? params[2] : "");
            let password: string = (params.length == 4 ? params[3] : "");
            if (system === "test") {
                resolve(this.setupTest(url, username, password));
            } else if (system === "fhem") {
                this.setupFhem(user, url, username, password).then(res => resolve(res));
            }
        });
    }

    private setupTest(url: string, username: string, password: string): string {
        return "Simulated setup of url=" + url + "; username=" + username + "; password=" + password;
    }

    private setupFhem(user: User, url: string, username: string, password: string): Promise<string> {
        return new Promise((resolve) => {
            let bridge: FhemBridge = new FhemBridge();
            bridge.fhemUrl = url;
            bridge.username = username;
            bridge.password = password;
            bridge.checkConnection().then(success => {
                if (success) {
                    user.bridges.push(bridge);
                    user.save();
                    resolve("Okay, I've set up your FHEM system. You should be able to control it now by talking with me. " +
                    "Ask me for help if you don't know what to say ;-)");
                } else {
                    resolve("I could not connect to your FHEM system. Please check your URL and credentials.");
                }
            });
        });
    }
}
