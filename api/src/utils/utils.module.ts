import { Module, Global } from '@nestjs/common';
import { CsvHelperService } from './csv-helper';
import { CloudStorageService } from './cloud-storage.service';

@Global()
@Module({
    imports: [],
    exports: [CsvHelperService, CloudStorageService],
    controllers: [],
    providers: [CsvHelperService, CloudStorageService],
})
export class UtilsModule {}
