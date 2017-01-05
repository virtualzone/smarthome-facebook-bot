import { MongoError } from "mongodb";
import { SmartHomeBridge } from "../bridge/bridge";
import { BridgeFactory } from "../bridge/bridge-factory";
import { Database } from "../util/database";

export class User {
    public facebookUserId: string = "";
    public name: string = "";
    public bridges: SmartHomeBridge[] = new Array();
    public aliases: any = new Object();

    constructor(facebookUserId: string) {
        this.facebookUserId = facebookUserId;
    }

    public hasBridges(): boolean {
        return this.bridges.length > 0;
    }

    public getFirstBridge(): SmartHomeBridge {
        if (!this.hasBridges()) {
            return null;
        }
        return this.bridges[0];
    }

    public addAlias(alias: string, device: string): void {
        let lowerAlias = alias.toLowerCase().trim();
        this.aliases[lowerAlias] = device;
    }

    public resolveAlias(alias: string): string {
        let lowerAlias = alias.toLowerCase().trim();
        if (lowerAlias in this.aliases) {
            return this.aliases[lowerAlias];
        } else {
            return alias;
        }
    }

    public removeAlias(alias: string): void {
        let lowerAlias = alias.toLowerCase().trim();
        delete this.aliases[lowerAlias];
    }

    public save(): Promise<User> {
        return new Promise<User>((resolve) => {
            let user: Object = {
                _id: this.facebookUserId
            };
            Database.get()
                .collection("users")
                .update(user, this.getObjectForDb())
                .then(res => resolve(this));
        });
    }

    public delete(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            let user: Object = {
                _id: this.facebookUserId
            };
            Database.get()
                .collection("users")
                .deleteOne(user)
                .then(() => resolve(true))
                .catch(() => resolve(false));
        });
    }

    public static loadOrCreate(facebookUserId: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            User.existsUser(facebookUserId).then((exists: boolean) => {
                if (exists) {
                    User.loadUser(facebookUserId).then(user => resolve(user));
                } else {
                    User.createUser(facebookUserId).then(user => resolve(user));
                }
            });
        });
    }

    private getObjectForDb(): any {
        let bridges: any[] = new Array();
        for (let i=0; i<this.bridges.length; i++) {
            let bridge: SmartHomeBridge = this.bridges[i];
            bridges.push(bridge.getConfig());
        }
        return {
            _id: this.facebookUserId,
            name: this.name,
            bridges: bridges,
            aliases: this.aliases
        };
    }

    public dbToUser(result: any): void {
        this.name = result.name;
        this.bridges = BridgeFactory.createBridges(result.bridges);
        if ("aliases" in result) {
            this.aliases = result.aliases;
        }
    }

    private static existsUser(facebookUserId: string): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            let user: Object = {
                _id: facebookUserId
            };
            Database.get()
                .collection("users")
                .find(user)
                .limit(1)
                .count(false, (err: MongoError, num: number) => {
                    resolve(num > 0);
                });
        });
    }

    private static createUser(facebookUserId: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            let user: Object = {
                _id: facebookUserId,
                bridges: []
            };
            Database.get()
                .collection("users")
                .insert(user)
                .then(res => resolve(new User(facebookUserId)))
                .catch(err => reject(err));
        });
    }

    private static loadUser(facebookUserId: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            let user: Object = {
                _id: facebookUserId
            };
            Database.get()
                .collection("users")
                .findOne(user, (err: MongoError, result: any) => {
                    if (err != null) {
                        reject(err);
                    }
                    let user: User = new User(result._id);
                    user.dbToUser(result);
                    resolve(user);
                });
        });
    }
}
