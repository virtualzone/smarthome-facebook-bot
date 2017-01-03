import { Command } from "./command";
import { SmartHomeBridge } from "../bridge/bridge";

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

    public execute(bridge: SmartHomeBridge, params: string[]): string {
        let device: string = params[0];
        bridge.switchOff(device);
        return `Okay, I've switched ${device} off.`;
    }
}
