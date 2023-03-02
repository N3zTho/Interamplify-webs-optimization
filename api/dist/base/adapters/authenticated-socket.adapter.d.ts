import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server } from 'socket.io';
export declare class AuthenticatedSocketAdapter extends IoAdapter {
    private app;
    private readonly logger;
    private readonly userService;
    constructor(app: INestApplicationContext);
    createIOServer(port: number, options?: any): Server<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>;
}
