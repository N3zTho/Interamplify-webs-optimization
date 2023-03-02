import {Injectable} from "@nestjs/common";
import {NotificationGateway} from "../gateways/notification.gateway";
import {NotificationDto} from "../dto/notification.dto";

@Injectable()
export class NotificationService {
    constructor(private readonly notificationGateway: NotificationGateway) {}

    /**
     * Send notification
     *
     * @param notification the notification
     */
    async send(notification:NotificationDto){
       this.notificationGateway.sendMessage(notification);
    }
}
