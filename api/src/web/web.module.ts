import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { WebService } from './web.service';
import { WebRepository } from './web.repository';
import { WebController } from './web.controller';
import { DuplicatesConsumer } from './jobs/duplicates.consumer';
import {ReportModule} from "../report/report.module";
import {BaseModule} from "../base/base.module";

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'domainDuplicates',
    }),
    ReportModule,
    BaseModule
  ],
  exports: [WebService],
  controllers: [WebController],
  providers: [WebService, WebRepository, DuplicatesConsumer],
})
export class WebModule {}
