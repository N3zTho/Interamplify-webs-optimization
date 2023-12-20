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
var DuplicatesConsumer_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicatesConsumer = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const csv_helper_1 = require("../../utils/csv-helper");
const web_service_1 = require("../web.service");
const cloud_storage_service_1 = require("../../utils/cloud-storage.service");
const email_service_1 = require("../../utils/email.service");
const user_service_1 = require("../../user/user.service");
const person_service_1 = require("../../user/person.service");
const internal_report_service_1 = require("../../report/services/internal-report.service");
const fs = require("fs");
const notification_service_1 = require("../../base/services/notification.service");
const slack_service_1 = require("../../base/services/slack.service");
let DuplicatesConsumer = DuplicatesConsumer_1 = class DuplicatesConsumer {
    constructor(csvParser, webService, cloudStorageService, emailService, userService, personService, internalReportService, notificationService, slackService) {
        this.csvParser = csvParser;
        this.webService = webService;
        this.cloudStorageService = cloudStorageService;
        this.emailService = emailService;
        this.userService = userService;
        this.personService = personService;
        this.internalReportService = internalReportService;
        this.notificationService = notificationService;
        this.slackService = slackService;
        this.logger = new common_1.Logger(DuplicatesConsumer_1.name);
    }
    async checkDuplicates(job) {
        this.logger.debug('Starting duplicates job...');
        this.logger.debug(job.data);
        try {
            this.logger.debug('Parsing csv file');
            const result = await this.csvParser.parsev2(job.data.fileName);
            this.logger.debug('Removing csv file');
            fs.unlinkSync(`public/${job.data.fileName}`);
            this.logger.debug(`Processing ${result.length} domains`);
            const filePath = await this.webService.duplicatesV2(result);
            this.logger.debug('Generating file');
            const uniqueSuffix = `duplicate_domains/${Date.now()}-${Math.round(Math.random() * 1e9)}.xlsx`;
            this.logger.debug('Uploading file to cloud storage');
            const cloudStorageUrl = await this.cloudStorageService.upload(uniqueSuffix, filePath, true);
            this.logger.debug(`The external file url is ${cloudStorageUrl}`);
            this.logger.debug('Creating report');
            const msg = `El fichero de duplicados está disponible en <a href="${cloudStorageUrl}" class="text-secondary" target="_blank">${cloudStorageUrl}</a>`;
            const report = await this.internalReportService.create(job.data.userId, "DUPLICADOS", msg);
            const user = await this.userService.get(job.data.userId);
            const person = await this.personService.get(job.data.personId);
            if (user && person) {
                this.logger.debug('Sending notification');
                const notification = {
                    title: "Dominios duplicados",
                    text: "Proceso terminado con exito.",
                    to: [Number(user.id)],
                    store: false,
                    link: `job/report-intern/${report.id}`,
                    btnText: "Ver Detalles",
                    type: "success",
                };
                await this.notificationService.send(notification);
                this.logger.debug('Sending email');
                const reportUrl = `${process.env.INTERAMPLIFY_APP_URL}job/report-intern/${report.id}`;
                const mailOptions = {
                    template: "duplicates",
                    file_url: reportUrl,
                    from: process.env.MJ_EMAIL_SENDER,
                    name: 'Interamplify',
                    to_name: `${person.nombre} ${person.apellidos}`,
                    to_email: user.email,
                    subject: 'Dominios duplicados',
                    message: 'Este mensaje es para notificarle que el proceso de comprobar duplicados ha terminado.',
                    alternative_message: `Este mensaje es para notificarle que el proceso de comprobar duplicados ha terminado. Puede ver el informe en este <a href="${reportUrl}">enlace</a>`
                };
                await this.emailService.sendEmail(mailOptions);
                const messages = [];
                messages.push(`Hola ${person.nombre},`);
                messages.push(`El proceso de duplicados ha concluido. El fichero está disponible en ${cloudStorageUrl}`);
                await this.slackService.sendMessage(user.id, messages);
            }
        }
        catch (e) {
            this.logger.debug(`Error on duplicates job: ${e}`);
        }
        this.logger.debug('Duplicates job completed');
    }
};
__decorate([
    bull_1.Process(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DuplicatesConsumer.prototype, "checkDuplicates", null);
DuplicatesConsumer = DuplicatesConsumer_1 = __decorate([
    bull_1.Processor('domainDuplicates'),
    __metadata("design:paramtypes", [csv_helper_1.CsvHelperService,
        web_service_1.WebService,
        cloud_storage_service_1.CloudStorageService,
        email_service_1.EmailService,
        user_service_1.UserService,
        person_service_1.PersonService,
        internal_report_service_1.InternalReportService,
        notification_service_1.NotificationService,
        slack_service_1.SlackService])
], DuplicatesConsumer);
exports.DuplicatesConsumer = DuplicatesConsumer;
//# sourceMappingURL=duplicates.consumer.js.map