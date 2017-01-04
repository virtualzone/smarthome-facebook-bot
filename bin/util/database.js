"use strict";
const mongodb_1 = require("mongodb");
const config_1 = require("./config");
class Database {
    static get() {
        return Database.DB;
    }
    static connect() {
        return new Promise((resolve, reject) => {
            let url = config_1.Config.getInstance().getConfig().mongodb.url;
            let options = config_1.Config.getInstance().getConfig().mongodb.options;
            mongodb_1.MongoClient.connect(url, options, (err, db) => {
                if (err != null) {
                    reject(err);
                }
                Database.DB = db;
                resolve(db);
            });
        });
    }
    static disconnect() {
        if (Database.DB != null) {
            Database.DB.close();
        }
    }
}
Database.DB = null;
exports.Database = Database;
