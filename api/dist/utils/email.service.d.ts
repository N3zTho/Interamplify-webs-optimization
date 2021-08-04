import { TemplateService } from "./template.service";
export declare class EmailService {
    private readonly templateService;
    constructor(templateService: TemplateService);
    private readonly logger;
    sendEmail(mailOptions: any): Promise<boolean>;
    private getMailerClient;
}
