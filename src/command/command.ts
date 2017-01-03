import { SmartHomeBridge } from "../bridge/bridge";

export abstract class Command {
    private compiledPatterns: RegExp[] = [];

    constructor() {
        this.compilePatterns();
    }

    protected abstract getCommandRegexList(): string[];

    public abstract execute(bridge: SmartHomeBridge, params: string[]): string;

    public getCompiledPatterns(): RegExp[] {
        return this.compiledPatterns;
    }

    public matches(s: string): RegExp {
        let regexes: RegExp[] = this.getCompiledPatterns();
        for (let i=0; i<regexes.length; i++) {
            let regex: RegExp = regexes[i];
            if (regex.test(s)) {
                return regex;
            }
        }
        return null;
    }

    private compilePatterns(): void {
        let regexes: string[] = this.getCommandRegexList();
        for (let i=0; i<regexes.length; i++) {
            let regex: string = regexes[i];
            let pattern: RegExp = new RegExp(regex, "i");
            this.compiledPatterns.push(pattern);
        }
    }
}
