import { Command } from "./command";
import { User } from "../model/user";

export class SwitchOffCommand extends Command {
    protected getCommandRegexList(): string[] {
        return [
            "turn (.+) off",
            "switch (.+) off",
            "(.+) off",
            "schalte (.+) aus",
            "mach (.+) aus",
            "mache (.+) aus",
            "mach das (.+) aus",
            "mache das (.+) aus",
            "(.+) aus"
        ];
    }

    public execute(user: User, params: string[]): Promise<string> {
        return new Promise((resolve) => {
            if (!user.hasBridges()) {
                resolve("Please setup a smart home system first.");
            } else {
                let device: string = user.resolveAlias(params[0]);
                user.getFirstBridge().switchOff(device);
                resolve(`Okay, I've switched ${device} off.`);
            }
        });
    }
}
