import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import {AuthenticatedSocketAdapter} from "./base/adapters/authenticated-socket.adapter";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
      AppModule,
  );

  app.useWebSocketAdapter(new AuthenticatedSocketAdapter(app));

  app.setGlobalPrefix('api/v1');

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(3003);
}
bootstrap();
