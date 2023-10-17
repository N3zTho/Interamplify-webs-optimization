import {Injectable} from "@nestjs/common";
import {ConfigurationRepository} from "../repositories/configuration.repository";
import {Configuration} from "../models/configuration.model";

@Injectable()
export class ConfigurationService {
    constructor(private configurationRepository: ConfigurationRepository) {}

    /**
     * Get a configuration by key
     *
     * @param userId the user id
     * @param key    the configuration key
     */
    async getByKey(userId: bigint, key: string): Promise<Configuration> {

        const configuration: Configuration = await this.configurationRepository.findByKey(userId, key);

        return configuration;

    }
}
