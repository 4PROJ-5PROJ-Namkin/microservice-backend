import Users from "./entities/users.entity";
import { UserService } from "./users.service";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UserService);
    findAllUser(): Promise<Users[]>;
    GetUser(): Promise<Users[]>;
}
