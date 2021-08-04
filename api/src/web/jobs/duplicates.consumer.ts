import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { CsvHelperService } from '../../utils/csv-helper';
import { WebService } from '../web.service';
import { CloudStorageService } from '../../utils/cloud-storage.service';
import { EmailService } from '../../utils/email.service';
import {UserService} from "../../user/user.service";
import {PersonService} from "../../user/person.service";

@Processor('domainDuplicates')
export class DuplicatesConsumer {
  constructor(
    private readonly csvParser: CsvHelperService,
    private readonly webService: WebService,
    private readonly cloudStorageService: CloudStorageService,
    private readonly emailService: EmailService,
    private userService: UserService,
    private personService: PersonService,
  ) {}

  private readonly logger = new Logger(DuplicatesConsumer.name);

    @Process()
    async checkDuplicates(job: Job) {
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

        if(user && person) {
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
}