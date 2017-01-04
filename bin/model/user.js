"use strict";
const database_1 = require("../util/database");
class User {
    constructor(facebookUserId) {
        this.facebookUserId = "";
        this.name = "";
        this.bridges = new Array();
        this.facebookUserId = facebookUserId;
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
        return {
            _id: this.facebookUserId,
            name: this.name,
            bridges: this.bridges
        };
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
                user.name = result.name;
                user.bridges = result.bridges;
                resolve(user);
            });
        });
    }
}
exports.User = User;
