"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticatedSocketAdapter = void 0;
const common_1 = require("@nestjs/common");
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const user_service_1 = require("../../user/user.service");
class AuthenticatedSocketAdapter extends platform_socket_io_1.IoAdapter {
    constructor(app) {
        super(app);
        this.app = app;
        this.logger = new common_1.Logger(AuthenticatedSocketAdapter.name);
        this.userService = this.app.get(user_service_1.UserService);
    }
    createIOServer(port, options) {
        const server = super.createIOServer(port, options);
        server.use(async (socket, next) => {
            const { token: uuid, conn: tenant_id } = socket.handshake.auth;
            try {
                const user = await this.userService.getByUuid(uuid);
                if (user) {
                    return next();
                }
                else {
                    this.logger.debug(`Trying to connect with invalid token: ${uuid}`);
                    return next(new Error("forbidden"));
                }
                return next();
            }
            catch (error) {
                return next(new Error('Authentication error'));
            }
        });
        return server;
    }
}
exports.AuthenticatedSocketAdapter = AuthenticatedSocketAdapter;
//# sourceMappingURL=authenticated-socket.adapter.js.map