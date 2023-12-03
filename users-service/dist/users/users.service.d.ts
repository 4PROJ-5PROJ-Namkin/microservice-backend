import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { UpdateUsersDto } from './dto/update-users.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<Users>);
    findAllUsers(headers: any): Promise<Users[]>;
    findById(id: string, headers: any): Promise<Users>;
    updatePassword(id: string, updatePasswordUserDto: UpdateUsersDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
