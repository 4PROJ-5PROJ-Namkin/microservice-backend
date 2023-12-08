import { Repository } from "typeorm";
import { Token, LoginUserDto, RegisterUserDto } from "./dto/auth.dto";
import Users from "src/users/entities/users.entity";
export declare class AuthService {
    private usersRepository;
    constructor(usersRepository: Repository<Users>);
    login(loginData: LoginUserDto): Promise<Token>;
    createCommercial(user: RegisterUserDto): Promise<void>;
    createAdmin(user: RegisterUserDto, headers: any): Promise<void>;
}
