import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginController, RegisterController } from './auth.controller';
import { AuthService } from './auth.service';
import { RolesGuard } from './guards/auth.guard';
import Users from 'src/users/entities/users.entity';

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

export class AuthModule {


}