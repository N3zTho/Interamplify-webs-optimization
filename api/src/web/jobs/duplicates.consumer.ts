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
  ) {}

  private readonly logger = new Logger(DuplicatesConsumer.name);

    @Process()
    async checkDuplicates(job: Job) {
        this.logger.debug('Starting duplicates job...');
        this.logger.debug(job.data);

        try {
            this.logger.debug('Parsing csv file');
            const result = await this.csvParser.parse(job.data.fileName);

            this.logger.debug('Removing csv file');
            fs.unlinkSync(`public/${job.data.fileName}`);

            this.logger.debug('Generating file');
            const filePath = await this.webService.duplicates(result);
            const uniqueSuffix = `duplicate_domains/${Date.now()}-${Math.round(Math.random() * 1e9)}.xlsx`;

            this.logger.debug('Uploading file to cloud storage');
            const cloudStorageUrl = await this.cloudStorageService.upload(uniqueSuffix, filePath, true);

            this.logger.debug(`The external file url is ${cloudStorageUrl}`);

            this.logger.debug('Creating report');
            const msg = `El fichero de duplicados está disponible en <a href="${cloudStorageUrl}" class="text-secondary" target="_blank">${cloudStorageUrl}</a>`;
            await this.internalReportService.create(job.data.userId, "DUPLICADOS", msg);

            const user = await this.userService.get(job.data.userId);
            const person = await this.personService.get(job.data.personId);

            this.logger.debug('Sending email');

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
        } catch (e) {
            this.logger.debug(`Error on duplicates job: ${e}`);
        }

        this.logger.debug('Duplicates job completed');
    }
}
