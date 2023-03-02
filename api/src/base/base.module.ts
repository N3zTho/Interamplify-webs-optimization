import { Global, Module } from '@nestjs/common';
import { NotificationGateway } from './gateways/notification.gateway';
import {NotificationService} from "./services/notification.service";

@Global()
@Module({
    imports: [],
    exports: [NotificationService],
    controllers: [],
    providers: [NotificationGateway, NotificationService],
})
export class BaseModule {}
