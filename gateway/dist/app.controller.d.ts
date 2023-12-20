import { HttpService } from '@nestjs/axios';
import { LoginUserDto, RegisterUserDto } from './gateway/auth.dto';
import { UpdateUsersDto } from './gateway/update-users.dto';
export declare class AppController {
    private httpService;
    constructor(httpService: HttpService);
    getAllUsers(authHeader: any): import("rxjs").Observable<any>;
    getUserById(authHeader: any, id: string): import("rxjs").Observable<any>;
    updateUserById(userData: UpdateUsersDto, authHeader: any, id: string): import("rxjs").Observable<any>;
    deleteUserById(authHeader: any, id: string): import("rxjs").Observable<any>;
    createUser(userData: RegisterUserDto): import("rxjs").Observable<any>;
    login(loginData: LoginUserDto): import("rxjs").Observable<any>;
    getMaterialPrices(materialId: number): import("rxjs").Observable<any>;
}
