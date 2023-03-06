import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { initializeApp, applicationDefault } from 'firebase-admin/app';

async function bootstrap() {
  const firebase = initializeApp({
    credential: applicationDefault(),
  });

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
