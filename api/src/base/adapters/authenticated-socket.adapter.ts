import {INestApplicationContext, Logger} from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server } from 'socket.io';
import {UserService} from "../../user/user.service";

export class AuthenticatedSocketAdapter extends IoAdapter {
    private readonly logger = new Logger(AuthenticatedSocketAdapter.name);
    private readonly userService;

    constructor(private app: INestApplicationContext) {
        super(app);
        this.userService = this.app.get(UserService);
    }

    createIOServer(port: number, options?: any) {
        const server: Server = super.createIOServer(port, options);

        server.use(async (socket: any, next) => {
            const { token: uuid, conn: tenant_id } = socket.handshake.auth;

            try {
                const user = await this.userService.getByUuid(uuid);

                if (user) {
                    return next();
                } else {
                    this.logger.debug(`Trying to connect with invalid token: ${uuid}`);
                    return next(new Error("forbidden"));
                }
                return next();
            } catch (error: any) {
                return next(new Error('Authentication error'));
            }
        });

        return server;
    }
}
