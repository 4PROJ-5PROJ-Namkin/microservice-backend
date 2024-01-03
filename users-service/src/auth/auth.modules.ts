import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { RolesGuard } from './guards/auth.guard';
import Users from 'src/users/entities/users.entity';
import { LoginController, RegisterController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AuthService,
  ],

  controllers: [LoginController, RegisterController],
  exports: [AuthService],
})

export class AuthModule {}


// import { Module } from '@nestjs/common';
// import { APP_GUARD } from '@nestjs/core';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { RolesGuard } from './guards/auth.guard';
// import { ClientsModule, Transport } from '@nestjs/microservices';
// import { join } from 'path';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import Users from 'src/users/entities/users.entity';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([Users]),
//     ClientsModule.register([
//       {
//         name: 'USER_SERVICE',
//         transport: Transport.GRPC,
//         options: {
//           package: 'user',
//           protoPath: join(__dirname, '../../user.proto'),
//           url: 'users-services-backend:50051',
//         },
//       },
//     ]),
//   ],
//   providers: [
//     {
//       provide: APP_GUARD,
//       useClass: RolesGuard,
//     },
//     AuthService,
//   ],

//   controllers: [AuthController],
//   exports: [AuthService],
// })

// export class AuthModule { }