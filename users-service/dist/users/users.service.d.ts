import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<Users>);
    findById(id: string, headers: any): Promise<Users>;
    findAllUsers(headers: any): Promise<Users[]>;
}
