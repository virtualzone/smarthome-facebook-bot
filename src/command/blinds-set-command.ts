import { Command } from "./command";
import { User } from "../model/user";

export class BlindsSetCommand extends Command {
    protected getCommandRegexList(): string[] {
        return [
            "set (.+) to (\\d+) percent",
            "set (.+) to (\\d+) %",
            "set (.+) to (\\d+)%",
            "fahre (.+) auf (\\d+) Prozent",
            "fahre (.+) auf (\\d+) %",
            "fahre (.+) auf (\\d+)%"
        ];
    }

    public execute(user: User, params: string[]): Promise<string> {
        return new Promise((resolve) => {
            if (!user.hasBridges()) {
                resolve("Please setup a smart home system first.");
            } else {
                let device: string = params[0];
                let num: number = parseInt(params[1]);
                user.getFirstBridge().setBlinds(device, num);
                resolve(`Okay, I've set blind ${device} to ${num}%.`);
            }
        });
    }
}
