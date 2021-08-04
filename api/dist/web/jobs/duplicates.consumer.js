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
let DuplicatesConsumer = DuplicatesConsumer_1 = class DuplicatesConsumer {
    constructor(csvParser, webService, cloudStorageService, emailService, userService, personService) {
        this.csvParser = csvParser;
        this.webService = webService;
        this.cloudStorageService = cloudStorageService;
        this.emailService = emailService;
        this.userService = userService;
        this.personService = personService;
        this.logger = new common_1.Logger(DuplicatesConsumer_1.name);
    }
    async checkDuplicates(job) {
        this.logger.debug('Starting duplicates job...');
        this.logger.debug(job.data);
        const result = await this.csvParser.parse(job.data.fileName);
        this.logger.debug('Generating file');
        const filePath = await this.webService.duplicates(result);
        const uniqueSuffix = `duplicate_domains/${Date.now()}-${Math.round(Math.random() * 1e9)}.xlsx`;
        this.logger.debug('Uploading file to cloud storage');
        const cloudStorageUrl = await this.cloudStorageService.upload(uniqueSuffix, filePath, true);
        this.logger.debug(`The external file url is ${cloudStorageUrl}`);
        const user = await this.userService.get(job.data.userId);
        const person = await this.personService.get(job.data.personId);
        if (user && person) {
            const mailOptions = {
                template: "duplicates",
                file_url: cloudStorageUrl,
                from: process.env.MJ_EMAIL_SENDER,
                name: 'Interamplify',
                to_name: `${person.nombre} ${person.apellidos}`,
                to_email: user.email,
                subject: 'Dominios duplicados',
                message: 'Este mensaje es para notificarle que el fichero de duplicados ya está disponible.',
                alternative_message: `Este mensaje es para notificarle que el fichero de duplicados ya está disponible <a href="${cloudStorageUrl}">Descargar</a>`
            };
            await this.emailService.sendEmail(mailOptions);
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
        person_service_1.PersonService])
], DuplicatesConsumer);
exports.DuplicatesConsumer = DuplicatesConsumer;
//# sourceMappingURL=duplicates.consumer.js.map