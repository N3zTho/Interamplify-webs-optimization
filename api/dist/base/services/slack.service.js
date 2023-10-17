"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SlackService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlackService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const configuration_service_1 = require("../services/configuration.service");
let SlackService = SlackService_1 = class SlackService {
    constructor(configurationService) {
        this.configurationService = configurationService;
        this.logger = new common_1.Logger(SlackService_1.name);
    }
    async sendMessage(userId, messages) {
        var _a;
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
                const result = await axios_1.default.post('https://slack.com/api/chat.postMessage', body, {
                    headers: {
                        Authorization: `Bearer ${process.env.SLACK_BOT_USER}`,
                    },
                });
                if (((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.ok) == true) {
                    this.logger.debug(`The message was sent to Slack`);
                }
                else {
                    this.logger.debug(`Could not send message to Slack`);
                }
                return true;
            }
            else {
                this.logger.debug('Slack is not configured');
            }
        }
        catch (e) {
            this.logger.debug(`Could not send message to Slack`);
        }
        return false;
    }
};
SlackService = SlackService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [configuration_service_1.ConfigurationService])
], SlackService);
exports.SlackService = SlackService;
//# sourceMappingURL=slack.service.js.map