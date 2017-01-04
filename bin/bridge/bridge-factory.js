"use strict";
const fhem_bridge_1 = require("./fhem-bridge");
class BridgeFactory {
    static createBridges(bridgeConfigs) {
        let result = new Array();
        for (let i = 0; i < bridgeConfigs.length; i++) {
            let bridgeConfig = bridgeConfigs[i];
            let type = bridgeConfig.type;
            let bridge = BridgeFactory.createBridge(type, bridgeConfig);
            if (bridge != null) {
                result.push(bridge);
            }
        }
        return result;
    }
    static createBridge(type, config) {
        let bridge;
        if (type === "fhem") {
            bridge = new fhem_bridge_1.FhemBridge();
        }
        else {
            console.log("Unknown bridge type %s, skipping", type);
            return null;
        }
        bridge.parseConfig(config);
        return bridge;
    }
}
exports.BridgeFactory = BridgeFactory;
