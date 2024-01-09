import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Users from './users.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/auth.guard';



@Module({
  imports: [ 
    TypeOrmModule.forFeature([Users]), 
    ClientsModule.register([
    {
      name: 'USERS_SERVICE',
      transport: Transport.GRPC,
      options: {
        package: 'user',
        protoPath: join(__dirname, '../../user.proto'),
        url: 'users-services-backend:50051',
      },
    },

  ]),
],
providers: [
  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
  AuthService,
],
    controllers: [AuthController],
    exports: [AuthService],
})

export class AuthModule { }