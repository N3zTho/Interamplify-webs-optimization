import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module';
import { WebModule } from './web/web.module';
import { MulterModule } from '@nestjs/platform-express';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register({
      dest: './public/files',
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_URL,
        port: parseInt(process.env.REDIS_PORT, 10) || 6379,
      },
    }),
    DatabaseModule,
    UtilsModule,
    WebModule,
  ],
})
export class AppModule {}
