import { Injectable } from '@nestjs/common';
import {Configuration} from "../models/configuration.model";

@Injectable()
export class ConfigurationRepository {

    /**
     * Find a configuration by key
     *
     * @param userId the user id
     * @param key    the configuration key
     */
    async findByKey(userId: bigint, key: string): Promise<Configuration> {
        const configuration = await Configuration.findOne({
           where: {
               key: key,
               user_id: userId,
           }
        });

        return configuration;
    }
}
