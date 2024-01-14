import { HttpService } from '@nestjs/axios';
import { LoginUserDto, RegisterUserDto } from './gateway/auth.dto';
import { UpdateUsersDto } from './gateway/update-users.dto';
import { UpdateMaterialDto } from './gateway/update-material.dto';
import { CreateMaterialDto } from './gateway/create-material.dto';
export declare class AppController {
    private httpService;
    constructor(httpService: HttpService);
    getAllUsers(authHeader: any): import("rxjs").Observable<any>;
    getUserById(authHeader: any, id: string): import("rxjs").Observable<any>;
    updateUserById(userData: UpdateUsersDto, authHeader: any, id: string): import("rxjs").Observable<any>;
    deleteUserById(authHeader: any, id: string): import("rxjs").Observable<any>;
    login(loginData: LoginUserDto): import("rxjs").Observable<any>;
    createUser(userData: RegisterUserDto): import("rxjs").Observable<any>;
    getAllMaterials(): import("rxjs").Observable<any>;
    getMaterialById(authHeader: any, id: number): import("rxjs").Observable<any>;
    updateMaterialById(materialData: UpdateMaterialDto): import("rxjs").Observable<any>;
    createMaterial(materialData: CreateMaterialDto): import("rxjs").Observable<any>;
}
