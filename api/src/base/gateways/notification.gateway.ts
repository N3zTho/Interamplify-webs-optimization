import {
    ConnectedSocket,
    MessageBody, OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';


@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class NotificationGateway implements OnGatewayConnection {
    @WebSocketServer()
    server: Server;

    handleConnection(@ConnectedSocket() client: any) {
        console.log(
          `user with socket ${client.id} connected`,
        );
        client.broadcast.emit("onUserConnected", "Client connected");
    }

    @SubscribeMessage('notification')
    handleEvent(@MessageBody() data: any) {
        console.log(data);
    }

    sendMessage(payload: any) {
        this.server.emit("notification", payload);
    }
}
