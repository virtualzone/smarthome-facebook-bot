import { expect } from "chai";
import "mocha";

import { User } from "../src/model/user";
import { CommandExecutor } from "../src/command/command-executor";

describe("HelloCommand", () => {
    it("should return a greeting for a simple 'hello'", (done) => {
        CommandExecutor.execute(new User("test"), "hello").then(result => {
            expect(result).not.to.contain("Sorry");
            done();
        }).catch(done);
    });

    it("should return a greeting for a 'hello bot!'", (done) => {
        CommandExecutor.execute(new User("test"), "hello bot!").then(result => {
            expect(result).not.to.contain("Sorry");
            done();
        }).catch(done);
    });
});
