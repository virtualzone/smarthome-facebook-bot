import { expect } from "chai";
import "mocha";

import { LanguageTools } from "../src/util/language-tools";

describe("LaguageTools", () => {
    describe("#splitSentences", () => {
        it("should split simple strings", () => {
            let input: string = "Hello! How are you?";
            let output: string[] = LanguageTools.splitSentences(input);
            expect(output).is.an("array");
            expect(output).to.have.length(2);
            expect(output[0]).to.equal("Hello");
            expect(output[1]).to.equal("How are you");
        });

        it("should return an empty array for an empty string", () => {
            let input: string = "";
            let output: string[] = LanguageTools.splitSentences(input);
            expect(output).is.an("array");
            expect(output).to.have.length(0);
        });

        it("should return a array for an simple string", () => {
            let input: string = "this is a test";
            let output: string[] = LanguageTools.splitSentences(input);
            expect(output).is.an("array");
            expect(output).to.have.length(1);
            expect(output[0]).to.equal("this is a test");
        });

        it("should not remove dots without space", () => {
            let input: string = "Turn on Kitchen.Lamp1";
            let output: string[] = LanguageTools.splitSentences(input);
            expect(output).is.an("array");
            expect(output).to.have.length(1);
            expect(output[0]).to.equal("Turn on Kitchen.Lamp1");
        });
    });

    describe("#normalize", () => {
        it("should remove unnecessary blanks", () => {
            let input: string = "   this     is a  test ";
            let output: string = LanguageTools.normalize(input);
            expect(output).to.equal("this is a test");
        });
    });

    describe("#removeStopWords", () => {
        it("should remove 'the'", () => {
            let input: string = "switch on the light";
            let output: string = LanguageTools.removeStopWords(input);
            expect(output).to.equal("switch on light");
        });

        it("should remove 'a'", () => {
            let input: string = "switch on a lamp";
            let output: string = LanguageTools.removeStopWords(input);
            expect(output).to.equal("switch on lamp");
        });

        it("should remove 'das eine'", () => {
            let input: string = "schalte das eine licht an";
            let output: string = LanguageTools.removeStopWords(input);
            expect(output).to.equal("schalte licht an");
        });

        it("should remove 'please'", () => {
            let input: string = "please switch on the light";
            let output: string = LanguageTools.removeStopWords(input);
            expect(output).to.equal("switch on light");
        });

        it("should remove 'bitte sei so nett'", () => {
            let input: string = "bitte sei so nett schalte das licht an";
            let output: string = LanguageTools.removeStopWords(input);
            expect(output).to.equal("schalte licht an");
        });

        it("should remove 'could you please'", () => {
            let input: string = "could you please turn on the light";
            let output: string = LanguageTools.removeStopWords(input);
            expect(output).to.equal("turn on light");
        });
    });
});
