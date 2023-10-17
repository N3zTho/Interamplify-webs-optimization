import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { CsvHelperService } from '../../utils/csv-helper';
import { WebService } from '../web.service';
import { CloudStorageService } from '../../utils/cloud-storage.service';
import { EmailService } from '../../utils/email.service';
import {UserService} from "../../user/user.service";
import {PersonService} from "../../user/person.service";
import {InternalReportService} from "../../report/services/internal-report.service";
import * as fs from 'fs';
import {NotificationService} from "../../base/services/notification.service";
import {SlackService} from "../../base/services/slack.service";
import {NotificationDto} from "../../base/dto/notification.dto";

@Processor('domainDuplicates')
export class DuplicatesConsumer {
  constructor(
    private readonly csvParser: CsvHelperService,
    private readonly webService: WebService,
    private readonly cloudStorageService: CloudStorageService,
    private readonly emailService: EmailService,
    private readonly userService: UserService,
    private readonly personService: PersonService,
    private readonly internalReportService: InternalReportService,
    private readonly notificationService: NotificationService,
    private readonly slackService: SlackService
  ) {}

  private readonly logger = new Logger(DuplicatesConsumer.name);

    @Process()
    async checkDuplicates(job: Job) {
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

                const notification: NotificationDto = {
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

                const reportUrl = `${process.env.INTERAMPLIFY_APP_URL}/job/report-intern/${report.id}`;

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

                const messages: Array<string> = [];
                messages.push(`Hola ${person.nombre},`);
                messages.push(`El proceso de duplicados ha concluido. El fichero está disponible en ${cloudStorageUrl}`);

                await this.slackService.sendMessage(user.id, messages);
            }

        } catch (e) {
            this.logger.debug(`Error on duplicates job: ${e}`);
        }

        this.logger.debug('Duplicates job completed');
    }
}
