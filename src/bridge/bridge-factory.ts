import { SmartHomeBridge } from './bridge';
import { FhemBridge } from "./fhem-bridge";

export class BridgeFactory {
    public static createBridges(bridgeConfigs: any[]): SmartHomeBridge[] {
        let result: SmartHomeBridge[] = new Array();
        for (let i=0; i<bridgeConfigs.length; i++) {
            let bridgeConfig: any = bridgeConfigs[i];
            let type: string = bridgeConfig.type;
            let bridge: SmartHomeBridge = BridgeFactory.createBridge(type, bridgeConfig);
            if (bridge != null) {
                result.push(bridge);
            }
        }
        return result;
    }

    private static createBridge(type: string, config: any): SmartHomeBridge {
        let bridge: SmartHomeBridge;
        if (type === "fhem") {
            bridge = new FhemBridge();
        } else {
            console.log("Unknown bridge type %s, skipping", type);
            return null;
        }
        bridge.parseConfig(config);
        return bridge;
    }
}
