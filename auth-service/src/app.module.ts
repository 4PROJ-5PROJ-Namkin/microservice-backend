import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userDbConfig } from './auth/config/user.database';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(userDbConfig),
    // ClientsModule.register([AuthModule]),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
