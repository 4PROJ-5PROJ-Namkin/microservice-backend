import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { DecodeToken, VerifyToken } from '../utils/jwt';
import { Role } from './auth.enum';
import { error } from 'console';

@Injectable()
export class AuthGuards implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [context.getHandler(), context.getClass()]);

    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const authorizationHeader = req.headers.authorization;

    // Check if roles needed
    if (!requiredRoles) {
      return true;
    }

    // Check if roles needed and if user has token
    if (requiredRoles && !authorizationHeader) {
      throw new UnauthorizedException('Unauthorized');
    }

    // Check if token is valid (Error thrown in validation)
    if (!await VerifyToken(authorizationHeader.split(' ')[1])) {
      throw new UnauthorizedException('Invalid token');
    }

    // Get the data from the token
    const tokenData = await DecodeToken(authorizationHeader.split(' ')[1]);
    // Check if user has the required role
    if (requiredRoles.find(role => role === tokenData.role)) {
      return true;
    } else {
      throw new UnauthorizedException(tokenData.role);
    }
  }
  
}
