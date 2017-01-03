import * as request from "request";

import { SmartHomeBridge } from "./bridge";

export class FhemBridge extends SmartHomeBridge {
    private fhemUrl: string;
    private username: string;
    private password: string;

    constructor() {
        super();
    }

    public parseConfig(config: any): void {
        this.fhemUrl = config.fhemUrl;
        this.username = config.username;
        this.password = config.password;
    }

    public switchOn(device: string): void {
        this.sendCommandToDevice(device, "on");
    }

    public switchOff(device: string): void {
        this.sendCommandToDevice(device, "off");
    }

    public setBlinds(device: string, level: number): void {
        this.sendCommandToDevice(device, String(level));
    }

    public sendCommandToDevice(device: string, action: string): void {
        let cmd: string = `set ${device} ${action}`;
        console.log("Sending %s to %s", cmd, this.fhemUrl);
        let payload = {
            cmd: cmd
        };
        request
            .post(this.fhemUrl, (err, response, body) => {
                if (err) {
                    throw err;
                }
                if (response.statusCode >= 400 && response.statusCode <= 599) {
                    console.error("Error: Received HTTP Status %d from %s", response.statusCode, this.fhemUrl);
                }
            })
            .form(payload)
            .auth(this.username, this.password, true);
    }
}
