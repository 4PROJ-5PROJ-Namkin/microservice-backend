import { Body, Controller, Get, Headers, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';
import { HelloAuthResponse } from 'generatedAuthProto/auth/HelloAuthResponse';
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginUserDto, Token, TokenStructure } from './dto/auth.dto';


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
  async login(@Body() loginData: LoginUserDto): Promise <Token> {
    return this.authService.login(loginData);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 401, description: 'User not found' })
  @ApiResponse({ status: 401, description: 'Error during token generation' })
  @ApiResponse({ status: 401, description: 'Wrong password' })
  @GrpcMethod('AuthService', 'DecodeToken')
  @Get('decodeToken')
  async decodeToken(@Headers('authorization') authHeader: any): Promise <TokenStructure> {
    return this.authService.DecodeToken(authHeader);
  }



  // }

  // @ApiTags('Authentification ')
  // @Controller('register')
  // export class RegisterController {
  //   constructor(private readonly authService: AuthService) { }


  //   @GrpcMethod('AuthService', 'createCommercial')
  //   @Post()
  //   @UsePipes(new ValidationPipe({ transform: true }))
  //   @ApiResponse({ status: 400, description: 'User may already exist' })
  //   @ApiResponse({ status: 500, description: 'Error creating user' })
  //   async createCommercial(@Body() userData: RegisterUserDto): Promise<void> {
  //     return this.authService.createCommercial(userData);
  //   }

  //   @ApiBearerAuth('JWT-auth')
  //   @Roles(Role.ADMIN)
  //   @Post('admin')
  //   @UsePipes(new ValidationPipe({ transform: true }))
  //   @ApiResponse({ status: 400, description: 'User may already exist' })
  //   @ApiResponse({ status: 500, description: 'Error creating user' })
  //   async createAdmin(@Headers() headers: any, @Body() userData: RegisterUserDto): Promise<void> {
  //     return this.authService.createAdmin(userData, headers);
  //   }

}
