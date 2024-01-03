import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.modules';
import { userDbConfig } from './config/user.database';


@Module({
  imports: [
    TypeOrmModule.forRootAsync(userDbConfig),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { UsersModule } from './users/users.module';
// import { ClientsModule, Transport } from '@nestjs/microservices';
// import { userDbConfig } from './config/user.database';
// import { join } from 'path';
// import { AuthModule } from './auth/auth.modules';


// @Module({
//   imports: [
//     ClientsModule.register([
//       {
//         name: 'USER_SERVICE',
//         transport: Transport.GRPC,
//         options: {
//           package: 'user',
//           protoPath: join(__dirname, '../user.proto'),
//           url: 'users-services-backend:50051',
//         },
//       },

//     ]),
//     TypeOrmModule.forRootAsync(userDbConfig),
//     UsersModule,
//     AuthModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule { }
