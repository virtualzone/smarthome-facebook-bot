export abstract class SmartHomeBridge {
    constructor() {}

    public abstract parseConfig(config: any): void;
    public abstract getConfig(): any;
    public abstract switchOn(device: string): void;
    public abstract switchOff(device: string): void;
    public abstract setBlinds(device: string, level: number): void;
    public abstract checkConnection(): Promise<boolean>;
}
