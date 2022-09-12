"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBusiness = void 0;
const User_1 = require("../models/User");
class UserBusiness {
    constructor(userDatabase, idGenerator, hashManager, authenticator) {
        this.userDatabase = userDatabase;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.authenticator = authenticator;
        this.signup = async (input) => {
            const name = input.name;
            const email = input.email;
            const password = input.password;
            if (!name || !email || !password) {
                throw new Error("Parâmetros ausentes.");
            }
            if (typeof name !== "string" || name.length < 3) {
                throw new Error("Parâmetro 'name' inválido.");
            }
            if (typeof email !== "string" || email.length < 3) {
                throw new Error("Parâmetro 'email' inválido.");
            }
            if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
                throw new Error("Parâmetro 'email' inválido.");
            }
            if (typeof password !== "string" || password.length < 6) {
                throw new Error("Parâmetro 'password' inválido.");
            }
            const userDB = await this.userDatabase.findByEmail(email);
            if (userDB) {
                throw new Error("E-mail já cadastrado.");
            }
            const id = this.idGenerator.generate();
            const hashedPassword = await this.hashManager.hash(password);
            const user = new User_1.User(id, name, email, hashedPassword, User_1.USER_ROLES.NORMAL);
            await this.userDatabase.createUser(user);
            const payload = {
                id: user.getId(),
                role: user.getRole()
            };
            const token = this.authenticator.generateToken(payload);
            const response = {
                message: "Conta criada com sucesso!",
                token
            };
            return response;
        };
        this.login = async (input) => {
            const email = input.email;
            const password = input.password;
            if (!email || !password) {
                throw new Error("Parâmetros ausentes.");
            }
            if (typeof email !== "string" || email.length < 3) {
                throw new Error("Parâmetro 'email' inválido.");
            }
            if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
                throw new Error("Parâmetro 'email' inválido.");
            }
            if (typeof password !== "string" || password.length < 3) {
                throw new Error("Parâmetro 'password' inválido.");
            }
            const userDB = await this.userDatabase.findByEmail(email);
            if (!userDB) {
                throw new Error("E-mail não cadastrado.");
            }
            const user = new User_1.User(userDB.id, userDB.name, userDB.email, userDB.password, userDB.role);
            const isPasswordCorrect = await this.hashManager.compare(password, user.getPassword());
            if (!isPasswordCorrect) {
                throw new Error("Senha incorreta.");
            }
            const payload = {
                id: user.getId(),
                role: user.getRole()
            };
            const token = this.authenticator.generateToken(payload);
            const response = {
                message: "Login realizado com sucesso!",
                token
            };
            return response;
        };
    }
}
exports.UserBusiness = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map