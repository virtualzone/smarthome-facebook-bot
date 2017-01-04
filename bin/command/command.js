"use strict";
class Command {
    constructor() {
        this.compiledPatterns = [];
        this.compilePatterns();
    }
    getCompiledPatterns() {
        return this.compiledPatterns;
    }
    matches(s) {
        let regexes = this.getCompiledPatterns();
        for (let i = 0; i < regexes.length; i++) {
            let regex = regexes[i];
            if (regex.test(s)) {
                return regex;
            }
        }
        return null;
    }
    compilePatterns() {
        let regexes = this.getCommandRegexList();
        for (let i = 0; i < regexes.length; i++) {
            let regex = regexes[i];
            let pattern = new RegExp("^" + regex + "$", "i");
            this.compiledPatterns.push(pattern);
        }
    }
}
exports.Command = Command;
