import { Web } from './web.entity';
import { WebRepository } from './web.repository';
export declare class WebService {
    private webRepository;
    constructor(webRepository: WebRepository);
    findAll(): Promise<Web[]>;
    duplicates(domains: Array<string>): Promise<string>;
}
