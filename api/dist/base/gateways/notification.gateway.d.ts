import { OnGatewayConnection } from '@nestjs/websockets';
import { Server } from 'socket.io';
export declare class NotificationGateway implements OnGatewayConnection {
    server: Server;
    handleConnection(client: any): void;
    handleEvent(data: any): void;
    sendMessage(payload: any): void;
}
