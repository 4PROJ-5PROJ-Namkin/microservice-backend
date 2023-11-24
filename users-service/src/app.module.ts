import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { Users } from './users/entities/users.entity';
import { AuthModule } from './auth/auth.modules';
import { userDbConfig } from './config/user.database';


@Module({
  imports: [
    // TypeOrmModule.forRootAsync(userDbConfig),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
