export class LanguageTools {
    public static splitCommands(s: string): string[] {
        let tokens: string[] = s.split(/and|und|,|\.|!|\?/);
        let result: string[] = new Array();
        for (let i=0; i<tokens.length; i++) {
            let token: string = tokens[i];
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
