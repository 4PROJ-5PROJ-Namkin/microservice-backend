import { Body, Controller, Get, Headers, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';
import { HelloAuthResponse } from 'generatedAuthProto/auth/HelloAuthResponse';
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginUserDto, RegisterUserDto, Token, TokenStructure } from './dto/auth.dto';
import { Roles } from './guards/auth.decorator';
import { Role } from './guards/auth.enum';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('hello')
  @GrpcMethod('AuthService', 'getHelloAuth')
  async getHelloAuth(): Promise<HelloAuthResponse> {
    return this.authService.getHelloAuth();
  }


  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 401, description: 'User not found' })
  @ApiResponse({ status: 401, description: 'Error during token generation' })
  @ApiResponse({ status: 401, description: 'Wrong password' })
  @GrpcMethod('AuthService', 'login')
  @Post('Login')
  async login(@Body() loginData: LoginUserDto): Promise<Token> {
    return this.authService.login(loginData);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 401, description: 'User not found' })
  @ApiResponse({ status: 401, description: 'Error during token generation' })
  @ApiResponse({ status: 401, description: 'Wrong password' })
  @GrpcMethod('AuthService', 'DecodeToken')
  @Get('decodeToken')
  async decodeToken(@Headers('authorization') authHeader: any): Promise<TokenStructure> {
    return this.authService.DecodeToken(authHeader);
  }

  @GrpcMethod('AuthService', 'createCommercial')
  @Post('createUser')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 400, description: 'User may already exist' })
  @ApiResponse({ status: 500, description: 'Error creating user' })
  async createCommercial(@Body() userData: RegisterUserDto): Promise<void> {
    return this.authService.createUser(userData);
  }
}