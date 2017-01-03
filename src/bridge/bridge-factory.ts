import { SmartHomeBridge } from './bridge';
import { FhemBridge } from "./fhem-bridge";

export class BridgeFactory {
    private static BRIDGES: SmartHomeBridge[] = new Array();

    public static getFirstBridge(): SmartHomeBridge {
        return BridgeFactory.BRIDGES[0];
    }

    public static createBridges(bridgeConfigs: any[]): void {
        console.log("Reading Bridge Configs...");
        for (let i=0; i<bridgeConfigs.length; i++) {
            let bridgeConfig: any = bridgeConfigs[i];
            let type: string = bridgeConfig.type;
            console.log("Bridge %d = %s", i, type.toLowerCase());
            BridgeFactory.createBridge(type, bridgeConfig);
        }
        console.log("Bridges instantiated.");
    }

    private static createBridge(type: string, config: any): void {
        let bridge: SmartHomeBridge;
        if (type === "fhem") {
            bridge = new FhemBridge();
        } else {
            throw new Error("Unknown bridge type: " + type);
        }
        bridge.parseConfig(config);
        BridgeFactory.BRIDGES.push(bridge);
    }
}
