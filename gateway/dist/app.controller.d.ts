import { HttpService } from '@nestjs/axios';
import { LoginUserDto, RegisterUserDto } from './gateway/auth.dto';
export declare class AppController {
    private httpService;
    constructor(httpService: HttpService);
    getAllUsers(): import("rxjs").Observable<any>;
    getUserById(id: string): import("rxjs").Observable<any>;
    updateUserById(id: string, updateUserData: any): import("rxjs").Observable<any>;
    deleteUserById(id: string): import("rxjs").Observable<any>;
    createUser(userData: RegisterUserDto): import("rxjs").Observable<any>;
    login(loginData: LoginUserDto): import("rxjs").Observable<any>;
}
