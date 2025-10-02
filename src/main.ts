import { NestFactory } from '@nestjs/core';
import dotenv from 'dotenv';

import { AppModule } from './app.module.js';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
