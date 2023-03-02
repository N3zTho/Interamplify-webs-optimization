import { Job } from 'bull';
import { CsvHelperService } from '../../utils/csv-helper';
import { WebService } from '../web.service';
import { CloudStorageService } from '../../utils/cloud-storage.service';
import { EmailService } from '../../utils/email.service';
import { UserService } from "../../user/user.service";
import { PersonService } from "../../user/person.service";
import { InternalReportService } from "../../report/services/internal-report.service";
import { NotificationService } from "../../base/services/notification.service";
export declare class DuplicatesConsumer {
    private readonly csvParser;
    private readonly webService;
    private readonly cloudStorageService;
    private readonly emailService;
    private readonly userService;
    private readonly personService;
    private readonly internalReportService;
    private readonly notificationService;
    constructor(csvParser: CsvHelperService, webService: WebService, cloudStorageService: CloudStorageService, emailService: EmailService, userService: UserService, personService: PersonService, internalReportService: InternalReportService, notificationService: NotificationService);
    private readonly logger;
    checkDuplicates(job: Job): Promise<void>;
}
