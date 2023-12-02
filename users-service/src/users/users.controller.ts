import { Body, Headers, Controller, Delete, Get, Param, UsePipes, ValidationPipe, Patch, Post } from "@nestjs/common";
import { UUID } from './dto/params-user.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { UsersService } from './users.service';
import Users from "./entities/users.entity";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/auth/guards/auth.decorator";
import { Role } from "src/auth/guards/auth.enum";
import { MessagePattern, Payload } from "@nestjs/microservices";

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @MessagePattern({ cmd: 'get_allUser' })
  async findAllUser(@Headers() headers: any): Promise<Users[]> {
    return this.usersService.findAllUsers(headers);
  }

  @Get(':id')
  @MessagePattern({ cmd: 'get_OneUser' })
  async findOneById(@Payload() id: UUID) {
    return this.usersService.findById(id.id, Headers);
  }

  // @Patch(':id')
  // @Roles(Role.ADMIN, Role.COMMERCIAL)
  // @ApiOperation({ summary: 'Update password' })
  // @ApiResponse({status: 200, description: 'password updated', type: Users})
  // @ApiResponse({status: 404, description: 'User not found.'})
  // @ApiResponse({ status: 403, description: 'Forbidden' })
  // @UsePipes(new ValidationPipe({ transform: true }))
  // async updatePassword(@Param() id: UUID, @Body() updateUsersDto: UpdateUsersDto) {
  //   return this.usersService.updatePassword(id.id, updateUsersDto);
  // }

  // @Delete(':id')
  // @Roles(Role.ADMIN)
  // @ApiOperation({ summary: 'delete one user' })
  // @ApiResponse({ status: 403, description: 'Forbidden' })
  // @UsePipes(new ValidationPipe({ transform: true }))
  // async remove(@Param() id: UUID) {
  //   return this.usersService.remove(id.id);
  // }
}
