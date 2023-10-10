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
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const template_service_1 = require("./template.service");
let EmailService = EmailService_1 = class EmailService {
    constructor(templateService) {
        this.templateService = templateService;
        this.logger = new common_1.Logger(EmailService_1.name);
    }
    async sendEmail(mailOptions) {
        let data = {
            user: "",
            title: "",
            message: "",
            file_url: ""
        };
        try {
            const template = (mailOptions.template) ? mailOptions.template : 'duplicates';
            if (mailOptions.to_name) {
                data.user = mailOptions.to_name;
            }
            if (mailOptions.message) {
                data.message = mailOptions.message;
            }
            if (mailOptions.file_url) {
                data.file_url = mailOptions.file_url;
            }
            this.logger.log(`Sending email to: ${mailOptions.to_email}`);
            const htmlPart = await this.templateService.getTemplate(template, data);
            const mailerClient = await this.getMailerClient();
            let textPart = mailOptions.alternative_message;
            await mailerClient.post("send", { version: "v3.1" }).request({
                "Messages": [{
                        "From": {
                            "Email": mailOptions.from,
                            "Name": mailOptions.name
                        },
                        "To": [{
                                "Email": mailOptions.to_email,
                                "Name": mailOptions.to_name
                            }],
                        "Subject": mailOptions.subject,
                        "TextPart": textPart,
                        "HTMLPart": htmlPart,
                        "TemplateLanguage": true
                    }]
            });
            return true;
        }
        catch (e) {
            console.log(e);
        }
        return false;
    }
    async getMailerClient() {
        const mailerClient = require('node-mailjet')
            .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);
        return mailerClient;
    }
};
EmailService = EmailService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [template_service_1.TemplateService])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map