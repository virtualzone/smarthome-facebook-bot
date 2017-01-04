import { Command } from "./command";
import { User } from "../model/user";

export class HelpCommand extends Command {
    protected getCommandRegexList(): string[] {
        return [
            "help me",
            "what can i say",
            "what do you understand",
            "show me your commands",
            "tell me about your commands",
            "which commands do you understand",
            "how to use you",
            "how to talk to you",
            "do you understand me",
            "help",
            "hilf mir",
            "was verstehst du",
            "was kannst du",
            "welche befehle verstehst du",
            "welche kommandos verstehst du",
            "hilfe"
        ];
    }

    public execute(user: User, params: string[]): Promise<string> {
        return new Promise((resolve) => {
            resolve("You can use the following commands when talking to me. I also understand some variants of them:\n" +
                this.getHelpEntries().join("\n"));
        });
    }

    private getHelpEntries(): string[] {
        return [
            "* setup <system> <url> <username> <password>",
            "* switch <device> on",
            "* switch <device> off",
            "* open <device>",
            "* close <device>",
            "* set <device> to <percentage>",
            "* add alias <alias> for <device>",
            "* remove alias <alias>"
        ];
    }
}
