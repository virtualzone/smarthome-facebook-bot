"use strict";
const bridge_factory_1 = require("../bridge/bridge-factory");
const database_1 = require("../util/database");
class User {
    constructor(facebookUserId) {
        this.facebookUserId = "";
        this.name = "";
        this.bridges = new Array();
        this.aliases = new Object();
        this.facebookUserId = facebookUserId;
    }
    hasBridges() {
        return this.bridges.length > 0;
    }
    getFirstBridge() {
        if (!this.hasBridges()) {
            return null;
        }
        return this.bridges[0];
    }
    addAlias(alias, device) {
        this.aliases[alias] = device;
    }
    resolveAlias(alias) {
        if (alias in this.aliases) {
            return this.aliases[alias];
        }
        return alias;
    }
    removeAlias(alias) {
        delete this.aliases[alias];
    }
    save() {
        return new Promise((resolve) => {
            let user = {
                _id: this.facebookUserId
            };
            database_1.Database.get()
                .collection("users")
                .update(user, this.getObjectForDb())
                .then(res => resolve(this));
        });
    }
    delete() {
        return new Promise((resolve) => {
            let user = {
                _id: this.facebookUserId
            };
            database_1.Database.get()
                .collection("users")
                .deleteOne(user)
                .then(() => resolve(true))
                .catch(() => resolve(false));
        });
    }
    static loadOrCreate(facebookUserId) {
        return new Promise((resolve, reject) => {
            User.existsUser(facebookUserId).then((exists) => {
                if (exists) {
                    User.loadUser(facebookUserId).then(user => resolve(user));
                }
                else {
                    User.createUser(facebookUserId).then(user => resolve(user));
                }
            });
        });
    }
    getObjectForDb() {
        let bridges = new Array();
        for (let i = 0; i < this.bridges.length; i++) {
            let bridge = this.bridges[i];
            bridges.push(bridge.getConfig());
        }
        return {
            _id: this.facebookUserId,
            name: this.name,
            bridges: bridges,
            aliases: this.aliases
        };
    }
    dbToUser(result) {
        this.name = result.name;
        this.bridges = bridge_factory_1.BridgeFactory.createBridges(result.bridges);
        if ("aliases" in result) {
            this.aliases = result.aliases;
        }
    }
    static existsUser(facebookUserId) {
        return new Promise((resolve) => {
            let user = {
                _id: facebookUserId
            };
            database_1.Database.get()
                .collection("users")
                .find(user)
                .limit(1)
                .count(false, (err, num) => {
                resolve(num > 0);
            });
        });
    }
    static createUser(facebookUserId) {
        return new Promise((resolve, reject) => {
            let user = {
                _id: facebookUserId,
                bridges: []
            };
            database_1.Database.get()
                .collection("users")
                .insert(user)
                .then(res => resolve(new User(facebookUserId)))
                .catch(err => reject(err));
        });
    }
    static loadUser(facebookUserId) {
        return new Promise((resolve, reject) => {
            let user = {
                _id: facebookUserId
            };
            database_1.Database.get()
                .collection("users")
                .findOne(user, (err, result) => {
                if (err != null) {
                    reject(err);
                }
                let user = new User(result._id);
                user.dbToUser(result);
                resolve(user);
            });
        });
    }
}
exports.User = User;
