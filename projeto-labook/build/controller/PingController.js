"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingController = void 0;
class PingController {
    constructor(pingBusiness) {
        this.pingBusiness = pingBusiness;
        this.ping = async (req, res) => {
            let errorCode = 400;
            try {
                const response = await this.pingBusiness.ping();
                res.status(200).send(response);
            }
            catch (error) {
                res.status(errorCode).send({ message: error.message });
            }
        };
    }
}
exports.PingController = PingController;
//# sourceMappingURL=PingController.js.map