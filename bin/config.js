"use strict";
const fs = require("fs");
const path = require("path");
class Config {
    constructor() {
        if (Config.INSTANCE) {
            throw new Error("Call Config.getInstance() instead!");
        }
        this.loadConfig();
    }
    getConfig() {
        return this.config;
    }
    loadConfig() {
        let configPath = path.join(process.cwd(), "./etc/config.json");
        let json = fs.readFileSync(configPath, "utf8");
        this.config = JSON.parse(json);
    }
    static getInstance() {
        return Config.INSTANCE;
    }
}
Config.INSTANCE = new Config();
exports.Config = Config;
