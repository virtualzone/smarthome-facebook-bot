"use strict";
class LanguageTools {
    static splitCommands(s) {
        let tokens = LanguageTools.splitSentences(s);
        let result = new Array();
        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];
            token = LanguageTools.normalize(token);
            token = LanguageTools.removeStopWords(token);
            token = token.trim();
            if (token) {
                result.push(token);
            }
        }
        return result;
    }
    static splitSentences(s) {
        let tokens = s.split(/\sand\s|\sund\s|,\s|\.\s|!\s|\?\s/);
        let result = new Array();
        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i].trim();
            token = LanguageTools.removeTrailingPunctuation(token).trim();
            if (token) {
                result.push(token);
            }
        }
        return result;
    }
    static removeTrailingPunctuation(s) {
        return s.replace(/(\.|,|!|\?)$|/ig, "");
    }
    static normalize(s) {
        let result = s
            .replace(/\s\s+/ig, " ")
            .trim();
        return result;
    }
    static removeStopWords(s) {
        return s
            .replace(/(could you|könntest du|kannst du|können Sie|könnten Sie|would you|möchtest du|möchten Sie)\s/ig, "")
            .replace(/(bitte|please|sei so nett|be so kind)\s/ig, "")
            .replace(/(then|afterwords|after that|later)[\s,]/ig, "")
            .replace(/(\s(the|a|der|die|das|den|ein|eine)\s)+/ig, " ")
            .replace(/(\s(the|a|der|die|das|den|ein|eine)\s)+/ig, " ");
    }
}
exports.LanguageTools = LanguageTools;
