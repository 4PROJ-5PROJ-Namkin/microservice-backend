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
      name: 'USER_SERVICE',
      transport: Transport.GRPC,
      options: {
        package: 'user',
        protoPath: join(__dirname, '../../user.proto'),
        url: 'users-services-backend:50051',
      },
    },

  ]),
],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService],
})

export class UsersModule { }