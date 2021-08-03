/// <reference types="multer" />
import { Queue } from 'bull';
import { WebService } from './web.service';
import { Web } from './web.entity';
export declare class WebController {
    private webService;
    private readonly domainDuplicatesQueue;
    constructor(webService: WebService, domainDuplicatesQueue: Queue);
    findAll(): Promise<Web[]>;
    duplicates(file: Express.Multer.File, request: any): Promise<string>;
}
