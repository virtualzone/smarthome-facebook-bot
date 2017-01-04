import { MongoError } from "mongodb";
import { SmartHomeBridge } from "../bridge/bridge";
import { Database } from "../util/database";

export class User {
    public facebookUserId: string = "";
    public name: string = "";
    public bridges: SmartHomeBridge[] = new Array();

    constructor(facebookUserId: string) {
        this.facebookUserId = facebookUserId;
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
        return {
            _id: this.facebookUserId,
            name: this.name,
            bridges: this.bridges
        };
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
                    user.name = result.name;
                    user.bridges = result.bridges;
                    resolve(user);
                });
        });
    }
}
