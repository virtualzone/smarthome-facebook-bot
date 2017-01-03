import { Command } from "./command";
import { SmartHomeBridge } from "../bridge/bridge";

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

    public execute(bridge: SmartHomeBridge, params: string[]): void {
        let device: string = params[0];
        // TODO
    }
}