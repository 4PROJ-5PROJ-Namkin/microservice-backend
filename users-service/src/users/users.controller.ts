import { Body, Headers, Controller, Delete, Get, Param, UsePipes, ValidationPipe, Patch, UseGuards } from "@nestjs/common";
import { UUID } from './dto/params-user.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import Users from "./entities/users.entity";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { GrpcMethod } from "@nestjs/microservices";
import { HelloResponse } from "generatedUserProto/user/HelloResponse";
import { UpdateResult } from "typeorm";
import { Roles } from "src/guards/auth.decorator";
import { Role } from "src/guards/auth.enum";
import { Token } from "src/dto/auth.dto";

@ApiTags('Users')
@ApiBearerAuth('JWT-auth')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @ApiBearerAuth('JWT-auth')
  @Get('/GetAllusers')
  @GrpcMethod('UsersService', 'getAllUsers')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Find all user' })
  @ApiResponse({ status: 401, description: 'Token is expired or invalid' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @ApiResponse({ status: 500, description: 'Error finding users' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getAllUsers(@Headers() token: any): Promise<Users[]> {
    return await this.usersService.getAllUsers(token);
  }

  @Get('hello')
  async getHello(): Promise<HelloResponse> {
    return this.usersService.getHello();
  }

  @GrpcMethod('UsersService', 'getUserById')
  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Find one user' })
  @ApiResponse({status: 401, description: 'unauthorized'})
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getUserById(@Headers() headers: any, @Param('id') id: string): Promise<Users> {
    return this.usersService.getUserById(id, headers);
  }


  @GrpcMethod('UsersService', 'updateUser')
  @Patch(':id')
  @Roles(Role.ADMIN, Role.COMMERCIAL)
  @ApiOperation({ summary: 'Update password' })
  @ApiResponse({status: 200, description: 'password updated', type: Users})
  @ApiResponse({status: 404, description: 'User not found.'})
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateUser(@Param('id') id: string, @Body() updateUsersDto: UpdateUsersDto): Promise<UpdateResult> {
    return this.usersService.updateUser(id, updateUsersDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'delete one user' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async remove(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
