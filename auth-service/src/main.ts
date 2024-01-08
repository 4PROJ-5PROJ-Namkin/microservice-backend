import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'auth',
      protoPath: join(__dirname, '../auth.proto'),
      url: 'auth-services-backend:50052',
    },
  });
  await app.startAllMicroservices();
}
bootstrap();