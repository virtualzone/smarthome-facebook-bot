import { Command } from "./command";
import { User } from "../model/user";

export class BlindsCloseCommand extends Command {
    protected getCommandRegexList(): string[] {
        return [
            "close (.+)",
            "close blind (.+)",
            "(.+) runter",
            "mache (.+) runter",
            "mach (.+) runter",
            "schließe (.+)",
            "fahre (.+) runter",
            "fahre (.+) nach unten"
        ];
    }

    public execute(user: User, params: string[]): Promise<string> {
        return new Promise((resolve) => {
            if (!user.hasBridges()) {
                resolve("Please setup a smart home system first.");
            } else {
                let device: string = params[0];
                user.getFirstBridge().setBlinds(device, 0);
                resolve(`Okay, I've closed blind ${device}.`);
            }
        });
    }
}
