"use strict";
const fhem_bridge_1 = require("./fhem-bridge");
class BridgeFactory {
    static createBridges(bridgeConfigs) {
        console.log("Reading Bridge Configs...");
        for (let i = 0; i < bridgeConfigs.length; i++) {
            let bridgeConfig = bridgeConfigs[i];
            let type = bridgeConfig.type;
            console.log("Bridge %d = %s", i, type.toLowerCase());
            BridgeFactory.createBridge(type, bridgeConfig);
        }
        console.log("Bridges instantiated.");
    }
    static createBridge(type, config) {
        let bridge;
        if (type === "fhem") {
            bridge = new fhem_bridge_1.FhemBridge();
        }
        else {
            throw new Error("Unknown bridge type: " + type);
        }
        bridge.parseConfig(config);
        BridgeFactory.BRIDGES.push(bridge);
    }
}
BridgeFactory.BRIDGES = new Array();
exports.BridgeFactory = BridgeFactory;
