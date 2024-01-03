import { Body, Controller,Get,Headers, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Token, LoginUserDto, RegisterUserDto } from "./dto/auth.dto";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "./guards/auth.decorator";
import { Role } from "./guards/auth.enum";
import { GrpcMethod } from "@nestjs/microservices";
import { HelloResponse } from "generatedUserProto/user/HelloResponse";


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  
}


@ApiTags('Authentification ')
@Controller('login')
export class LoginController {
  constructor(private readonly authService: AuthService) { }

  
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 401, description: 'User not found' })
  @ApiResponse({ status: 401, description: 'Error during token generation' })
  @ApiResponse({ status: 401, description: 'Wrong password' })
  @GrpcMethod('AuthService', 'login')
  @Post()
  async login(@Body() loginData: LoginUserDto): Promise<Token> {
    return this.authService.login(loginData);
  }
}

@ApiTags('Authentification ')
@Controller('register')
export class RegisterController {
  constructor(private readonly authService: AuthService) { }


  @GrpcMethod('AuthService', 'createCommercial')
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 400, description: 'User may already exist' })
  @ApiResponse({ status: 500, description: 'Error creating user' })
  async createCommercial(@Body() userData: RegisterUserDto): Promise<void> {
    return this.authService.createCommercial(userData);
  }

  // @ApiBearerAuth('JWT-auth')
  // @Roles(Role.ADMIN)
  // @Post('admin')
  // @UsePipes(new ValidationPipe({ transform: true }))
  // @ApiResponse({ status: 400, description: 'User may already exist' })
  // @ApiResponse({ status: 500, description: 'Error creating user' })
  // async createAdmin(@Headers() headers: any, @Body() userData: RegisterUserDto): Promise<void> {
  //   return this.authService.createAdmin(userData, headers);
  // }

}


