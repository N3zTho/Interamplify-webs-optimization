import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { WebService } from './web.service';
import { WebRepository } from './web.repository';
import { WebController } from './web.controller';
import { DuplicatesConsumer } from './jobs/duplicates.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'domainDuplicates',
    }),
  ],
  exports: [WebService],
  controllers: [WebController],
  providers: [WebService, WebRepository, DuplicatesConsumer],
})
export class WebModule {}
