import { Module, Global } from '@nestjs/common';
import { CsvHelperService } from './csv-helper';
import { CloudStorageService } from './cloud-storage.service';
import { TemplateService } from './template.service';
import { EmailService } from './email.service';

@Global()
@Module({
    imports: [],
    exports: [CsvHelperService, CloudStorageService, TemplateService, EmailService],
    controllers: [],
    providers: [CsvHelperService, CloudStorageService, TemplateService, EmailService],
})
export class UtilsModule {}
