import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Token, LoginUserDto, RegisterUserDto } from "./dto/auth.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "./guards/auth.decorator";
import { Role } from "./guards/auth.enum";

@ApiTags('Authentification ')
@Controller('login')
export class LoginController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 401, description: 'User not found' })
  @ApiResponse({ status: 401, description: 'Error during token generation' })
  @ApiResponse({ status: 401, description: 'Wrong password' })
  async login(@Body() loginData: LoginUserDto): Promise<Token> {
    return this.authService.login(loginData);
  }

}

@ApiTags('Authentification ')
@Controller('register')
export class RegisterController {
  constructor(private readonly authService: AuthService) { }


  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 400, description: 'User may already exist' })
  @ApiResponse({ status: 500, description: 'Error creating user' })
  async createCommercial(@Body() userData: RegisterUserDto): Promise<void> {
    return this.authService.createCommercial(userData);
  }

  @Roles(Role.ADMIN)
  @Post('admin')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 400, description: 'User may already exist' })
  @ApiResponse({ status: 500, description: 'Error creating user' })
  async createAdmin(@Body() userData: RegisterUserDto): Promise<void> {
    return this.authService.createAdmin(userData);
  }

}


