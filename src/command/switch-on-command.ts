import { Command } from "./command";
import { User } from "../model/user";

export class SwitchOnCommand extends Command {
    protected getCommandRegexList(): string[] {
        return [
            "turn (.+) on",
            "switch (.+) on",
            "(.+) on",
            "schalte (.+) an",
            "mach (.+) an",
            "mache (.+) an",
            "mach das (.+) an",
            "mache das (.+) an",
            "(.+) an"
        ];
    }

    public execute(user: User, params: string[]): string {
        let device: string = params[0];
        //bridge.switchOn(device);
        return `Okay, I've switched ${device} on.`;
    }
}
