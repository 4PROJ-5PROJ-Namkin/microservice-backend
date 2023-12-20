import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuards } from './guards/auth.guard';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10000s' },
    }),],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuards,
    },
  ],
})
export class AuthModule { }