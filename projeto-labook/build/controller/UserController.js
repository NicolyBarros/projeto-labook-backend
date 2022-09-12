"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    constructor(userBusiness) {
        this.userBusiness = userBusiness;
        this.signup = async (req, res) => {
            try {
                const input = {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                };
                const response = await this.userBusiness.signup(input);
                res.status(201).send(response);
            }
            catch (error) {
                res.status(400).send({ message: error.message });
            }
        };
        this.login = async (req, res) => {
            try {
                const input = {
                    email: req.body.email,
                    password: req.body.password
                };
                const response = await this.userBusiness.login(input);
                res.status(200).send(response);
            }
            catch (error) {
                res.status(400).send({ message: error.message });
            }
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map