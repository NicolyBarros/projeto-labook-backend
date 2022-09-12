"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseDatabase_1 = require("../BaseDatabase");
const PostDatabase_1 = require("../PostDatabase");
const UserDatabase_1 = require("../UserDatabase");
const data_1 = require("./data");
class Migrations extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.execute = async () => {
            try {
                console.log("Creating tables...");
                await this.createTables();
                console.log("Tables created successfully.");
                console.log("Populating tables...");
                await this.insertData();
                console.log("Tables populated successfully.");
                console.log("Migrations completed.");
            }
            catch (error) {
                console.log("FAILED! Error in migrations...");
                console.log(error.message);
            }
            finally {
                console.log("Ending connection...");
                BaseDatabase_1.BaseDatabase.connection.destroy();
                console.log("Connection closed graciously.");
            }
        };
        this.createTables = async () => {
            await BaseDatabase_1.BaseDatabase.connection.raw(`
        DROP TABLE IF EXISTS ${PostDatabase_1.PostDatabase.TABLE_LIKES};
        DROP TABLE IF EXISTS ${PostDatabase_1.PostDatabase.TABLE_POSTS};
        DROP TABLE IF EXISTS ${UserDatabase_1.UserDatabase.TABLE_USERS};
        
        CREATE TABLE IF NOT EXISTS ${UserDatabase_1.UserDatabase.TABLE_USERS}(
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role ENUM("NORMAL", "ADMIN") DEFAULT "NORMAL" NOT NULL
        );

        CREATE TABLE IF NOT EXISTS ${PostDatabase_1.PostDatabase.TABLE_POSTS}(
            id VARCHAR(255) PRIMARY KEY,
            content VARCHAR(255) NOT NULL,
            user_id VARCHAR(255) NOT NULL,
            FOREIGN KEY (user_id) REFERENCES ${UserDatabase_1.UserDatabase.TABLE_USERS}(id)
        );

        CREATE TABLE IF NOT EXISTS ${PostDatabase_1.PostDatabase.TABLE_LIKES}(
            id VARCHAR(255) PRIMARY KEY,
            post_id VARCHAR(255) NOT NULL,
            user_id VARCHAR(255) NOT NULL,
            FOREIGN KEY (user_id) REFERENCES ${UserDatabase_1.UserDatabase.TABLE_USERS}(id),
            FOREIGN KEY (post_id) REFERENCES ${PostDatabase_1.PostDatabase.TABLE_POSTS}(id)
        );
        `);
        };
        this.insertData = async () => {
            await BaseDatabase_1.BaseDatabase
                .connection(UserDatabase_1.UserDatabase.TABLE_USERS)
                .insert(data_1.users);
            await BaseDatabase_1.BaseDatabase
                .connection(PostDatabase_1.PostDatabase.TABLE_POSTS)
                .insert(data_1.posts);
            await BaseDatabase_1.BaseDatabase
                .connection(PostDatabase_1.PostDatabase.TABLE_LIKES)
                .insert(data_1.likes);
        };
    }
}
const migrations = new Migrations();
migrations.execute();
//# sourceMappingURL=Migrations.js.map