import { Configuration } from "../models/configuration.model";
export declare class ConfigurationRepository {
    findByKey(userId: bigint, key: string): Promise<Configuration>;
}
