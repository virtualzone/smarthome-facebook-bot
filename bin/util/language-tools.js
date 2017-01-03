"use strict";
class LanguageTools {
    static splitCommands(s) {
        let tokens = s.split(/and|und|,|\.|!|\?/);
        let result = new Array();
        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];
            token = token
                .replace(/bitte|please|sei so nett|be so kind/ig, "")
                .replace(/\s\s+/ig, " ")
                .trim();
            if (token) {
                result.push(token);
            }
        }
        return result;
    }
}
exports.LanguageTools = LanguageTools;
