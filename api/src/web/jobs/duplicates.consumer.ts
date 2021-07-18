import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { CsvHelperService } from '../../utils/csv-helper';
import { WebService } from '../web.service';
import { CloudStorageService } from '../../utils/cloud-storage.service';

@Processor('domainDuplicates')
export class DuplicatesConsumer {
  constructor(
    private readonly csvParser: CsvHelperService,
    private readonly webService: WebService,
    private readonly cloudStorageService: CloudStorageService,
  ) {}

  private readonly logger = new Logger(DuplicatesConsumer.name);

    @Process()
    async checkDuplicates(job: Job) {
        this.logger.debug('Start transcoding...');
        this.logger.debug(job.data);
        const result = await this.csvParser.parse(job.data.fileName);
        // console.log(result);
        this.logger.debug('Generating file');
        const filePath = await this.webService.duplicates(result);
        const uniqueSuffix = `duplicate_domains/${Date.now()}-${Math.round(Math.random() * 1e9)}.xlsx`;
        this.logger.debug('The file path is');
        this.logger.debug('Uploading file to cloud storage');
        const cloudStorageUrl = await this.cloudStorageService.upload(uniqueSuffix, filePath);
        this.logger.debug(`The external file url is ${cloudStorageUrl}`);
        console.log(cloudStorageUrl);
        this.logger.debug('Transcoding completed');
    }
}