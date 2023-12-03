import { NestFactory } from '@nestjs/core';
import { ProductionModule } from './production.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(ProductionModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));

  const openApiOptions = new DocumentBuilder()
    .setTitle('Production API Service - Namkin X SUPINFO')
    .setDescription('<a href="/api/v1/production/production-swagger-spec.json" target="_blank">https://localhost:3002/api/v1/production/production-swagger-spec.json</a>')
    .setVersion('v1')
    .addServer('/api/v1')
    .build();

  const productionDocument = SwaggerModule.createDocument(app, openApiOptions, {
    include: [ProductionModule]
  });
  SwaggerModule.setup('api/v1/production', app, productionDocument);
  writeFileSync('./production-swagger-spec.json', JSON.stringify(productionDocument, null, 2));

  app.setGlobalPrefix('api/v1');
  app.enableCors();
  await app.listen(3002);
}

bootstrap();