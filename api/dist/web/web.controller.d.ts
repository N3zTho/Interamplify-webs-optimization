/// <reference types="multer" />
import { Queue } from 'bull';
import { WebService } from './web.service';
import { Web } from './web.entity';
import { NotificationService } from "../base/services/notification.service";
import { UserService } from "../user/user.service";
export declare class WebController {
    private webService;
    private readonly domainDuplicatesQueue;
    private readonly userService;
    private readonly notificationService;
    constructor(webService: WebService, domainDuplicatesQueue: Queue, userService: UserService, notificationService: NotificationService);
    private readonly logger;
    findAll(): Promise<Web[]>;
    sendMessage(): Promise<boolean>;
    duplicates(file: Express.Multer.File, request: any): Promise<string>;
}
