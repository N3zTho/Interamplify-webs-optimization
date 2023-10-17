import {Injectable, Logger} from '@nestjs/common';
import axios from "axios";
import {ConfigurationService} from "../services/configuration.service";

@Injectable()
export class SlackService {

    private readonly logger = new Logger(SlackService.name);

    constructor(private configurationService: ConfigurationService) {
    }

    /**
     * Sends messages to a channel
     *
     * @param userId   the user id
     * @param messages the messages
     */
    async sendMessage(userId: bigint, messages: Array<string>): Promise<boolean> {
        console.log(userId);
        try {
            this.logger.debug(`Getting Slack configuration`);

            const configuration = await this.configurationService.getByKey(userId, 'slack_user_id');

            if (configuration) {
                this.logger.debug(`Sending message to Slack channel`);

                const body = {
                    channel: configuration.value,
                    blocks: []
                };
                messages.map(m => {
                    body.blocks.push({
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": `${m}`,
                        },
                    });
                });

                const result = await axios.post('https://slack.com/api/chat.postMessage', body, {
                    headers: {
                        Authorization: `Bearer ${process.env.SLACK_BOT_USER}`,
                    },
                });

                if (result?.status == 200) {
                    this.logger.debug(`The message was sent to Slack`);
                } else {
                    this.logger.debug(`Could not send message to Slack`);
                }

                return true;
            } else {
                this.logger.debug('Slack is not configured');
            }

        } catch (e) {
            this.logger.debug(`Could not send message to Slack`);
        }
        return false;
    }
}
