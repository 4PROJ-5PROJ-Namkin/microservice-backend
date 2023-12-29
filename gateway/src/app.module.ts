import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: join(__dirname, '../user.proto'),
          url: 'users-services-backend:50051',
        },
      },
      {
        name: 'PRODUCTION_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'production',
          protoPath: join(__dirname, '../production.proto'),
          url: 'production-services-backend:50052',
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}