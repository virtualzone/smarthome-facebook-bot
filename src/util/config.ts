import * as fs from 'fs';
import * as path from 'path';

export class Config {
    private static INSTANCE: Config = new Config();
    private config: any;

    constructor() {
        if (Config.INSTANCE) {
            throw new Error("Call Config.getInstance() instead!");
        }
        this.loadConfig();
    }

    public getConfig(): any {
        return this.config;
    }

    private loadConfig(): void {
        let configPath: string = path.join(process.cwd(), "./etc/config.json");
        let json: string = fs.readFileSync(configPath, "utf8");
        this.config = JSON.parse(json);
    }

    public static getInstance(): Config {
        return Config.INSTANCE;
    }
}
