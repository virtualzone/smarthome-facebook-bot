export class LanguageTools {
    public static splitCommands(s: string): string[] {
        let tokens: string[] = LanguageTools.splitSentences(s);
        let result: string[] = new Array();
        for (let i=0; i<tokens.length; i++) {
            let token: string = tokens[i];
            token = LanguageTools.normalize(token);
            token = LanguageTools.removeStopWords(token);
            token = token.trim();
            if (token) {
                result.push(token);
            }
        }
        return result;
    }

    public static splitSentences(s: string): string[] {
        let tokens: string[] = s.split(/\sand\s|\sund\s|,\s|\.\s|!\s|\?\s/);
        let result: string[] = new Array();
        for (let i=0; i<tokens.length; i++) {
            let token: string = tokens[i].trim();
            token = LanguageTools.removeTrailingPunctuation(token).trim();
            if (token) {
                result.push(token);
            }
        }
        return result;
    }

    public static removeTrailingPunctuation(s: string): string {
        return s.replace(/(\.|,|!|\?)$|/ig, "");
    }

    public static normalize(s: string): string {
        let result: string = s
            .replace(/\s\s+/ig, " ")
            .trim();
        return result;
    }

    public static removeStopWords(s: string): string {
        return s
            .replace(/(could you|könntest du|kannst du|können Sie|könnten Sie|would you|möchtest du|möchten Sie)\s/ig, "")
            .replace(/(bitte|please|sei so nett|be so kind)\s/ig, "")
            .replace(/(then|afterwords|after that|later)[\s,]/ig, "")
            .replace(/(\s(the|a|der|die|das|ein|eine)\s)+/ig, " ")
            .replace(/(\s(the|a|der|die|das|ein|eine)\s)+/ig, " ");
    }
}
