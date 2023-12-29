import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: join(__dirname, '../user.proto'),
      url: 'users-services-backend:50051',
    },
  });
  await app.startAllMicroservices();
}
bootstrap();




// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import "reflect-metadata";
// import { ValidationPipe } from '@nestjs/common';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import * as cors from 'cors';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';
// import { join } from 'path';
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const config = new DocumentBuilder()
//   .setTitle('Api swagger')
//   .setDescription('Namkin Api swagger')
//   .setVersion('1.0')
//   .addServer('/api/v1')
//   .addBearerAuth(
//     { 
//       type: 'http', 
//       scheme: 'bearer', 
//       bearerFormat: 'JWT',
//       name: 'JWT',
//       description: 'Enter JWT token',
//       in: 'header',
//     },
//     'JWT-auth',
//   )
//   .build();
  
//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api/v1/user', app, document);

//   app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     optionsSuccessStatus: 204,
//   }));
//   app.connectMicroservice<MicroserviceOptions>({
//     transport: Transport.GRPC,
//     options: {
//       package: 'user',
//       protoPath: join(__dirname, '../user.proto'),
//       url: 'users-services-backend:50051',
//     },
//   });
//   await app.startAllMicroservices();
//   app.setGlobalPrefix('api/v1');
//   app.useGlobalPipes(new ValidationPipe());
//   // await app.listen(3001);
// }

// bootstrap();