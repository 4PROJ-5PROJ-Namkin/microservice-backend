import { NestFactory } from '@nestjs/core';
import { ProductionModule } from './production.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ProductionModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: false,
    forbidNonWhitelisted: false,
    transformOptions: {
      enableImplicitConversion: false,
    },
  }));

  app.setGlobalPrefix('api/v1');
  await app.listen(3000);
}
bootstrap();