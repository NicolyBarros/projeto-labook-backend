"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class UserDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.findByEmail = async (email) => {
            const usersDB = await BaseDatabase_1.BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
                .select()
                .where({ email });
            return usersDB[0];
        };
        this.createUser = async (user) => {
            const userDB = {
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword(),
                role: user.getRole()
            };
            await BaseDatabase_1.BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
                .insert(userDB);
        };
        this.findById = async (id) => {
            const usersDB = await BaseDatabase_1.BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
                .select()
                .where({ id });
            return usersDB[0];
        };
    }
}
exports.UserDatabase = UserDatabase;
UserDatabase.TABLE_USERS = "Labook_Users";
//# sourceMappingURL=UserDatabase.js.map