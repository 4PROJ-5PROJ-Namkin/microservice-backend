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
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}




// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { HttpModule } from "@nestjs/axios";

// @Module({
//   imports: [HttpModule],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}


// import { Module } from '@nestjs/common';
// import { ClientsModule, Transport } from '@nestjs/microservices';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
//   imports: [
//     ClientsModule.register([
//       {
//         name: 'users-service',
//         transport: Transport.TCP,
//         options: { host: 'localhost', port: 3001 },
//       },
//       {
//         name: 'production-service',
//         transport: Transport.TCP,
//         options: { host: 'localhost', port: 3002 },
//       },
//       {
//         name: 'contract-service',
//         transport: Transport.TCP,
//         options: { host: 'localhost', port: 3003 },
//       },
//     ]),
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
