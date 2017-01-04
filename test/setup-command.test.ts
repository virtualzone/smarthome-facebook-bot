import { expect } from "chai";
import "mocha";

import { CommandExecutor } from "../src/command/command-executor";

describe("SetupCommand", () => {
    it("should interpret 'setup' with username and password correctly", () => {
        let result: string = CommandExecutor.execute(null, "setup test http://my-smarthome:8080/fhem john doE123");
        expect(result).to.equal("Simulated setup of url=http://my-smarthome:8080/fhem; username=john; password=doE123");
    });

    it("should interpret 'setup' without username and password correctly", () => {
        let result: string = CommandExecutor.execute(null, "seTup Test http://my-smarthome:8080/fhem");
        expect(result).to.equal("Simulated setup of url=http://my-smarthome:8080/fhem; username=; password=");
    });

    it("should interpret 'set up' with username and password correctly", () => {
        let result: string = CommandExecutor.execute(null, "Set up test http://my-smarthome:8080/fhem john doE123");
        expect(result).to.equal("Simulated setup of url=http://my-smarthome:8080/fhem; username=john; password=doE123");
    });

    it("should return an error for unknown systems", () => {
        let result: string = CommandExecutor.execute(null, "setup nothingexists http://my-smarthome:8080/fhem john doE123");
        expect(result).to.contain("I'm sorry! I can't work with that system yet.");
    });
});
