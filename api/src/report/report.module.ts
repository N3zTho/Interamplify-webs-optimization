import { Module } from '@nestjs/common';
import { InternalReportService } from './services/internal-report.service';

@Module({
    imports: [],
    exports: [InternalReportService],
    controllers: [],
    providers: [InternalReportService],
})
export class ReportModule {}
