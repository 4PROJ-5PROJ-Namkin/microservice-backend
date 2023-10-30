// import 'reflect-metadata';
// import { ValidationPipe } from '@nestjs/common';
// import { Transport, MicroserviceOptions } from '@nestjs/microservices';
// import { AppModule } from './app.module';
// import { NestFactory } from '@nestjs/core';

// async function bootstrap() {
//   try {
//     const app = await NestFactory.createMicroservice<MicroserviceOptions>(
//       AppModule,
//       {
//         transport: Transport.REDIS,
//         options: {
//           host: 'localhost',
//           port: 6379,
//         },
//       },
//     );
//     app.useGlobalPipes(new ValidationPipe());
//     await app.listen();
//   } catch (error) {
//     console.error('Error starting microservice:', error);
//   }
// }

// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata";
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Api swagger')
  .setDescription('Namkin Api swagger')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  }));
  
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
}

bootstrap();

