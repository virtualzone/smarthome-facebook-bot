import { Command } from "./command";
import { User } from "../model/user";

export class BlindsOpenCommand extends Command {
    protected getCommandRegexList(): string[] {
        return [
            "open (.+)",
            "open blind (.+)",
            "(.+) hoch",
            "(.+) öffnen",
            "mache (.+) hoch",
            "mach (.+) hoch",
            "öffne (.+)",
            "fahre (.+) hoch",
            "fahre (.+) nach oben"
        ];
    }

    public execute(user: User, params: string[]): Promise<string> {
        return new Promise((resolve) => {
            if (!user.hasBridges()) {
                resolve("Please setup a smart home system first.");
            } else {
                let device: string = params[0];
                user.getFirstBridge().setBlinds(device, 100);
                resolve(`Okay, I've opened blind ${device}.`);
            }
        });
    }
}
