import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';


@Module({
  imports: [TypeOrmModule.forFeature([Users]),
  // AuthModule,
  ClientsModule.register([
    {
      name: 'AUTH_SERVICE',
      transport: Transport.GRPC,
      options: {
        package: 'auth',
        protoPath: join(__dirname, '../../auth.proto'),
        url: 'auth-services-backend:50052',
      },
    },
  ]),
],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService],
})

export class UsersModule { }