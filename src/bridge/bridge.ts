export abstract class SmartHomeBridge {
    constructor() {}

    public abstract parseConfig(config: any): void;
}
