import * as request from "request";

import { SmartHomeBridge } from "./bridge";

export class FhemBridge extends SmartHomeBridge {
    public fhemUrl: string;
    public username: string;
    public password: string;

    constructor() {
        super();
    }

    public parseConfig(config: any): void {
        this.fhemUrl = config.fhemUrl;
        this.username = config.username;
        this.password = config.password;
    }

    public getConfig(): any {
        return {
            type: "fhem",
            fhemUrl: this.fhemUrl,
            username: this.username,
            password: this.password
        };
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

    public checkConnection(): Promise<boolean> {
        return new Promise((resolve) => {
            request
                .get(this.fhemUrl, (err, response) => {
                    if (err) {
                        resolve(false);
                    }
                    if (response.statusCode >= 400 && response.statusCode <= 599) {
                        resolve(false);
                    }
                    resolve(true);
                })
                .auth(this.username, this.password, true);
        });
    }

    private sendCommandToDevice(device: string, action: string): void {
        let cmd: string = `set ${device} ${action}`;
        console.log("Sending %s to %s", cmd, this.fhemUrl);
        let payload = {
            cmd: cmd
        };
        request
            .post(this.fhemUrl, (err, response, body) => {
                if (err) {
                    console.error("Error: Received error while sending command to %s", this.fhemUrl);
                }
                if (response.statusCode >= 400 && response.statusCode <= 599) {
                    console.error("Error: Received HTTP Status %d from %s", response.statusCode, this.fhemUrl);
                }
            })
            .form(payload)
            .auth(this.username, this.password, true);
    }
}
