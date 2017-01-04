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

    public execute(user: User, params: string[]): string {
        let device: string = params[0];
        //bridge.switchOff(device);
        return `Okay, I've switched ${device} off.`;
    }
}
