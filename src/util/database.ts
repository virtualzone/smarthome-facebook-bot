import { MongoClient, MongoError, Db } from "mongodb";
import { Config } from './config';

export class Database {
    private static DB: Db = null;

    public static get(): Db {
        return Database.DB;
    }

    public static connect(): Promise<Db> {
        return new Promise<Db>((resolve, reject) => {
            let url: string = Config.getInstance().getConfig().mongodb.url;
            let options: any = Config.getInstance().getConfig().mongodb.options;
            MongoClient.connect(url, options, (err: MongoError, db: Db) => {
                if (err != null) {
                    reject(err);
                }
                Database.DB = db;
                resolve(db);
            });
        });
    }

    public static disconnect(): void {
        if (Database.DB != null) {
            Database.DB.close();
        }
    }
}
