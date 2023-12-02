import { UUID } from './dto/params-user.dto';
import { UsersService } from './users.service';
import Users from "./entities/users.entity";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAllUser(headers: any): Promise<Users[]>;
    findOneById(id: UUID): Promise<Users>;
}
