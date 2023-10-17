import { Global, Module } from '@nestjs/common';
import { NotificationGateway } from './gateways/notification.gateway';
import {NotificationService} from "./services/notification.service";
import {ConfigurationService} from "./services/configuration.service";
import {SlackService} from "./services/slack.service";
import {ConfigurationRepository} from "./repositories/configuration.repository";


@Global()
@Module({
    imports: [],
    exports: [NotificationService, ConfigurationService, SlackService],
    controllers: [],
    providers: [NotificationGateway, NotificationService, ConfigurationService, SlackService, ConfigurationRepository],
})
export class BaseModule {}
