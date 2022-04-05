import { Web } from './web.entity';
import { WebRepository } from './web.repository';
import { GestorService } from "../user/services/gestor.service";
export declare class WebService {
    private webRepository;
    private gestorService;
    constructor(webRepository: WebRepository, gestorService: GestorService);
    private readonly logger;
    findAll(): Promise<Web[]>;
    duplicates(domains: Array<string>): Promise<string>;
    duplicatesV2(domains: Array<string>): Promise<string>;
}
