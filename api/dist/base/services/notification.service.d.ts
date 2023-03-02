import { NotificationGateway } from "../gateways/notification.gateway";
import { NotificationDto } from "../dto/notification.dto";
export declare class NotificationService {
    private readonly notificationGateway;
    constructor(notificationGateway: NotificationGateway);
    send(notification: NotificationDto): Promise<void>;
}
