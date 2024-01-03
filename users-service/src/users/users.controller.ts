import { Body, Headers, Controller, Delete, Get, Param, UsePipes, ValidationPipe, Patch, UseGuards } from "@nestjs/common";
import { UUID } from './dto/params-user.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import Users from "./entities/users.entity";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { GrpcMethod } from "@nestjs/microservices";
import { HelloResponse } from "generatedUserProto/user/HelloResponse";
import { UpdateResult } from "typeorm";
import { AuthService } from "src/auth/auth.service";

@ApiTags('Users')
@ApiBearerAuth('JWT-auth')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly authService: AuthService) {}

  @GrpcMethod('UsersService', 'getAllUsers')
  @Get()
  // @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Find all user' })
  @ApiResponse({ status: 401, description: 'Token is expired or invalid' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @ApiResponse({ status: 500, description: 'Error finding users' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getAllUsers(headers: any): Promise<Users[]> {
    return this.usersService.getAllUsers(headers);
  }

  @GrpcMethod('UsersService', 'getHello')
  async getHello(): Promise<HelloResponse> {
    return this.usersService.getHello();
  }

  @GrpcMethod('AuthService', 'getHelloAuth')
  async getHelloAuth(): Promise<HelloResponse> {
    return this.authService.getHelloAuth();
  }

  // @GrpcMethod('UsersService', 'getUserById')
  // @Get(':id')
  // // @Roles(Role.ADMIN)
  // @ApiOperation({ summary: 'Find one user' })
  // @ApiResponse({status: 401, description: 'unauthorized'})
  // @ApiResponse({ status: 403, description: 'Forbidden resource' })
  // @UsePipes(new ValidationPipe({ transform: true }))
  // async getUserById(@Headers() headers: any,@Param() id: UUID): Promise<User> {
  //   return this.usersService.getUserById(id.id, headers);
  // }


  @GrpcMethod('UsersService', 'updateUser')
  @Patch(':id')
  // @Roles(Role.ADMIN, Role.COMMERCIAL)
  @ApiOperation({ summary: 'Update password' })
  @ApiResponse({status: 200, description: 'password updated', type: Users})
  @ApiResponse({status: 404, description: 'User not found.'})
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateUser(@Param() id: UUID, @Body() updateUsersDto: UpdateUsersDto): Promise<UpdateResult> {
    return this.usersService.updateUser(id.id, updateUsersDto);
  }

  // @Delete(':id')
  // @Roles(Role.ADMIN)
  // @ApiOperation({ summary: 'delete one user' })
  // @ApiResponse({ status: 403, description: 'Forbidden' })
  // @UsePipes(new ValidationPipe({ transform: true }))
  // async remove(@Param() id: UUID) {
  //   return this.usersService.remove(id.id);
  // }
}
