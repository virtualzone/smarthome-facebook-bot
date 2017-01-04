import { expect } from "chai";
import "mocha";

import { User } from "../src/model/user";
import { CommandExecutor } from "../src/command/command-executor";

describe("SetupCommand", () => {
    it("should interpret 'setup' with username and password correctly", (done) => {
        CommandExecutor.execute(new User("test"), "setup test http://my-smarthome:8080/fhem john doE123").then(result => {
            expect(result).to.equal("Simulated setup of url=http://my-smarthome:8080/fhem; username=john; password=doE123");
            done();
        }).catch(done);
    });

    it("should interpret 'setup' without username and password correctly", (done) => {
        CommandExecutor.execute(new User("test"), "seTup Test http://my-smarthome:8080/fhem").then(result => {
            expect(result).to.equal("Simulated setup of url=http://my-smarthome:8080/fhem; username=; password=");
            done();
        }).catch(done);
    });

    it("should interpret 'set up' with username and password correctly", (done) => {
        CommandExecutor.execute(new User("test"), "Set up test http://my-smarthome:8080/fhem john doE123").then(result => {
            expect(result).to.equal("Simulated setup of url=http://my-smarthome:8080/fhem; username=john; password=doE123");
            done();
        }).catch(done);
    });

    it("should return an error for unknown systems", (done) => {
        CommandExecutor.execute(new User("test"), "setup nothingexists http://my-smarthome:8080/fhem john doE123").then(result => {
            expect(result).to.contain("I'm sorry! I can't work with that system yet.");
            done();
        }).catch(done);
    });
});
