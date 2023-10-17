import { ConfigurationRepository } from "../repositories/configuration.repository";
import { Configuration } from "../models/configuration.model";
export declare class ConfigurationService {
    private configurationRepository;
    constructor(configurationRepository: ConfigurationRepository);
    getByKey(userId: bigint, key: string): Promise<Configuration>;
}
