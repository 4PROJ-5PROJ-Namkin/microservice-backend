import { UUID } from './dto/params-user.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { UsersService } from './users.service';
import Users from "./entities/users.entity";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAllUser(headers: any): Promise<Users[]>;
    findOneById(headers: any, id: UUID): Promise<Users>;
    updatePassword(id: UUID, updateUsersDto: UpdateUsersDto): Promise<import("typeorm").UpdateResult>;
    remove(id: UUID): Promise<import("typeorm").DeleteResult>;
}
