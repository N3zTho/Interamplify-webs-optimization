import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { DatabaseModule } from './config/database/database.module';
import { WebModule } from './web/web.module';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';
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
        username: process.env.REDIS_USER,
        password: process.env.REDIS_PASSWORD,
        tls: {
          servername: process.env.REDIS_URL
        }
      },
    }),
    DatabaseModule,
    UtilsModule,
    UserModule,
    WebModule,
    ReportModule
  ],
})
export class AppModule {}
