import { ConfigurationService } from "../services/configuration.service";
export declare class SlackService {
    private configurationService;
    private readonly logger;
    constructor(configurationService: ConfigurationService);
    sendMessage(userId: bigint, messages: Array<string>): Promise<boolean>;
}
