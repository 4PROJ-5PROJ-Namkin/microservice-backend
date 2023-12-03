import { Body, Headers, Controller, Delete, Get, Param, UsePipes, ValidationPipe, Patch } from "@nestjs/common";
import { UUID } from './dto/params-user.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { UsersService } from './users.service';
import Users from "./entities/users.entity";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/auth/guards/auth.decorator";
import { Role } from "src/auth/guards/auth.enum";
import { MessagePattern, Payload } from "@nestjs/microservices";

@ApiTags('Users')
@ApiBearerAuth('JWT-auth')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Find all user' })
  @ApiResponse({ status: 401, description: 'Token is expired or invalid' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @ApiResponse({ status: 500, description: 'Error finding users' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAllUser(@Headers() headers: any): Promise<Users[]> {
    return this.usersService.findAllUsers(headers);
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Find one user' })
  @ApiResponse({status: 401, description: 'unauthorized'})
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async findOneById(@Headers() headers: any,@Param() id: UUID) {
    return this.usersService.findById(id.id, headers);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.COMMERCIAL)
  @ApiOperation({ summary: 'Update password' })
  @ApiResponse({status: 200, description: 'password updated', type: Users})
  @ApiResponse({status: 404, description: 'User not found.'})
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async updatePassword(@Param() id: UUID, @Body() updateUsersDto: UpdateUsersDto) {
    return this.usersService.updatePassword(id.id, updateUsersDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'delete one user' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async remove(@Param() id: UUID) {
    return this.usersService.remove(id.id);
  }
}
