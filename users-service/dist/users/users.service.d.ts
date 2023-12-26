import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<Users>);
    getHello(): Promise<string>;
    GetUser(): Promise<Users[]>;
    findAllUsers(): Promise<Users[]>;
}
