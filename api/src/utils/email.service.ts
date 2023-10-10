import {Injectable, Logger} from '@nestjs/common';
import {TemplateService} from "./template.service";

@Injectable()
export class EmailService {

    constructor(
        private readonly templateService: TemplateService,
    ) {}
    private readonly logger = new Logger(EmailService.name);

    async sendEmail(mailOptions: any): Promise<boolean> {
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

            const result = await mailerClient.post("send", {version: "v3.1"}).request({
                "Messages":[{
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
                    "HTMLPart": htmlPart
                }]
            });

            return true;

        } catch (e) {
            console.log(e);
        }

        return false;
    }

    private async getMailerClient(): Promise<any> {
        const mailerClient = require ('node-mailjet')
            .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

        return mailerClient;
    }
}
